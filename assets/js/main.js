// Auto-sorting logic for projects and writing entries.
(function() {
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
    const list = document.getElementById('projects');
    if (!list) return;
    const items = Array.from(list.querySelectorAll('li'));
    const monthMap = { jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,sept:9,oct:10,nov:11,dec:12 };
    function periodEndValue(text) {
      if (!text) return 0;
      const cleaned = text.trim().toLowerCase().replace(/\s+–\s+/g,'–').replace(/\s+-\s+/g,'-');
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
      return bv - av; // descending
    });
    items.forEach(li => list.appendChild(li));
  }

  // Writing table: sort by date column descending (YYYY-MM or YYYY)
  function sortWriting() {
    const table = document.getElementById('writing');
    if (!table || table.tagName !== 'TABLE') return;
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    rows.sort((a,b) => {
      const ad = parseDate((a.querySelector('.date')?.getAttribute('data-date') || a.querySelector('.date')?.textContent || '').trim());
      const bd = parseDate((b.querySelector('.date')?.getAttribute('data-date') || b.querySelector('.date')?.textContent || '').trim());
      return bd - ad; // newest first
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
  }

  sortProjects();
  sortWriting();
})();