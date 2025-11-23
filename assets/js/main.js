// Auto-sorting logic for projects and writing entries.
(function() {
  // Theme initialization and toggle
  (function initTheme() {
    try {
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = stored || (prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
      const btn = document.getElementById('themeToggle');
      if (btn) {
        // For icons: sun for light, moon for dark
        const setBtn = (t) => {
          if (t === 'dark') {
            btn.textContent = '🌙';
            btn.setAttribute('aria-label', 'Switch to light mode');
            btn.setAttribute('title', 'Switch to light mode');
          } else {
            btn.textContent = '🌞';
            btn.setAttribute('aria-label', 'Switch to dark mode');
            btn.setAttribute('title', 'Switch to dark mode');
          }
        };
        setBtn(theme);
        btn.addEventListener('click', () => {
          const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
          const next = current === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', next);
          localStorage.setItem('theme', next);
          setBtn(next);
        });
      }
    } catch (e) {
      // fail silently if localStorage blocked
    }
  })();
  // Parse a date string like "2025-09", "2025-09-12" or just "2025".
  function parseDate(str) {
    if (!str) return 0;
    const parts = str.split(/[-–]/).filter(Boolean); // split on dash or en-dash
    const year = parseInt(parts[0], 10) || 0;
    const month = parseInt(parts[1], 10) || 1; // default Jan
    const day = parseInt(parts[2], 10) || 1;
    return new Date(year, month - 1, day).getTime();
  }

  // Projects: expect li with a .item-meta containing a period like "Aug–Sep 2025" or "2024" or "Aug 2023".
  function sortProjects() {
    ['research','projects'].forEach(id => {
      const list = document.getElementById(id);
      if (!list) return;
      const items = Array.from(list.querySelectorAll('li'));
    const monthMap = { jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,sept:9,oct:10,nov:11,dec:12 };
    function periodEndValue(text) {
      if (!text) return 0;
      const cleaned = text.trim().toLowerCase().replace(/\s+–\s+/g,'–').replace(/\s+-\s+/g,'-');
        const now = new Date();
        if (/(present|ongoing|current)$/.test(cleaned)) {
          // Use end of current month for stable ordering
          return new Date(now.getFullYear(), now.getMonth()+1, 0).getTime();
        }
      // If pure year
      if (/^\d{4}$/.test(cleaned)) return new Date(parseInt(cleaned,10),11,31).getTime();
      const yearMatches = cleaned.match(/(19|20)\d{2}/g) || [];
      const months = Object.keys(monthMap).join('|');
      const monthTokens = cleaned.match(new RegExp(`(${months})`, 'g')) || [];

      // Cross-year range e.g. "aug 2024 – apr 2025"
      if (yearMatches.length === 2) {
        const endYear = parseInt(yearMatches[1],10);
        // Use last month token AFTER second year appears; if not, use last overall.
        const lastMonthToken = monthTokens[monthTokens.length-1] || 'dec';
        const m = monthMap[lastMonthToken] || 12;
        return new Date(endYear, m, 0).getTime();
      }
      // Single-year with possibly multiple months: "aug–sep 2025" or "aug 2025"
      const singleYear = yearMatches[0] ? parseInt(yearMatches[0],10) : 1970;
      const lastMonthToken = monthTokens[monthTokens.length-1] || 'dec';
      const m = monthMap[lastMonthToken] || 12;
      return new Date(singleYear, m, 0).getTime();
    }
      items.sort((a,b) => {
        const av = periodEndValue(a.querySelector('.item-meta')?.textContent || '');
        const bv = periodEndValue(b.querySelector('.item-meta')?.textContent || '');
        // Primary: end date (descending)
        if (bv !== av) return bv - av;
        // Secondary: alphabetical by visible label/title
        const aLabel = (a.querySelector('.item-label')?.textContent || '').trim().toLowerCase();
        const bLabel = (b.querySelector('.item-label')?.textContent || '').trim().toLowerCase();
        return aLabel.localeCompare(bLabel);
      });
      items.forEach(li => list.appendChild(li));
    });
  }

  // Writing table: sort by date descending, then alphabetically by title within each date
  function sortWriting() {
    const table = document.getElementById('writing');
    if (!table || table.tagName !== 'TABLE') return;
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    rows.sort((a,b) => {
      const ad = parseDate((a.querySelector('.date')?.getAttribute('data-date') || a.querySelector('.date')?.textContent || '').trim());
      const bd = parseDate((b.querySelector('.date')?.getAttribute('data-date') || b.querySelector('.date')?.textContent || '').trim());
      
      // Primary sort: date (newest first)
      if (bd !== ad) return bd - ad;
      
      // Secondary sort: title alphabetically (A-Z)
      const aTitle = (a.querySelector('.title')?.textContent || '').trim().toLowerCase();
      const bTitle = (b.querySelector('.title')?.textContent || '').trim().toLowerCase();
      return aTitle.localeCompare(bTitle);
    });
    const tbody = table.querySelector('tbody');
    rows.forEach(r => tbody.appendChild(r));
    // Format date cells to Mon YYYY
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    rows.forEach(r => {
      const cell = r.querySelector('.date');
      if (!cell) return;
      const raw = (cell.getAttribute('data-date') || cell.textContent).trim();
      if (!cell.dataset.original) cell.dataset.original = raw; // preserve
      let y, m;
      const parts = raw.split('-');
      if (parts.length === 1 && /^\d{4}$/.test(parts[0])) { y = parseInt(parts[0],10); m = null; }
      else if (parts.length >= 2) { y = parseInt(parts[0],10); m = parseInt(parts[1],10); }
      if (!y || y < 1900) return;
      const label = m ? monthNames[(m-1) % 12] + ' ' + y : y.toString();
      cell.textContent = label;
    });
    
    // Count articles by type and display stats
    updateWritingStats(rows);
  }

  function updateWritingStats(rows) {
    const stats = {};
    const typeLabels = {
      'A': 'arXiv',
      'F': 'Feature',
      'M': 'Medium',
      'O': 'Other',
      'T': 'Technical Report',
      'U': 'Undergraduate Thesis'
    };
    
    // Track counts and most recent date per type
    const typeData = {};
    
    rows.forEach(r => {
      const typeCell = r.querySelector('.type');
      const dateCell = r.querySelector('.date');
      if (!typeCell) return;
      const typeMatch = typeCell.textContent.match(/\[([A-Z])\]/);
      if (typeMatch) {
        const type = typeMatch[1];
        if (!typeData[type]) {
          typeData[type] = { count: 0, latestDate: null };
        }
        typeData[type].count++;
        
        // Track most recent date
        if (dateCell) {
          const dateAttr = dateCell.getAttribute('data-date');
          if (dateAttr) {
            const currentDate = parseDate(dateAttr);
            if (!typeData[type].latestDate || currentDate > typeData[type].latestDate) {
              typeData[type].latestDate = currentDate;
            }
          }
        }
      }
    });
    
    // Build stats HTML
    const statsDiv = document.getElementById('writing-stats');
    if (!statsDiv) return;
    
    // Sort types: first by count (descending), then by most recent date (descending)
    const sortedTypes = Object.keys(typeData).sort((a, b) => {
      const countDiff = typeData[b].count - typeData[a].count;
      if (countDiff !== 0) return countDiff;
      
      // If counts are equal, sort by most recent date
      const aDate = typeData[a].latestDate || 0;
      const bDate = typeData[b].latestDate || 0;
      return bDate - aDate;
    });
    
    const parts = [];
    let total = 0;
    sortedTypes.forEach(type => {
      const count = typeData[type].count;
      total += count;
      parts.push(`${count} ${typeLabels[type]}`);
    });
    
    if (parts.length > 0) {
      statsDiv.innerHTML = `Cumulative: ${total}<br>${parts.join(' • ')}`;
    }
  }

  sortProjects();
  sortWriting();
})();