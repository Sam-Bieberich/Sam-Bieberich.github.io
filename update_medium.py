#!/usr/bin/env python3
"""
Scrape Medium profile for new articles and update index.html automatically.
"""
import os
import json
import re
from datetime import datetime
from urllib.parse import urlparse
import requests
from bs4 import BeautifulSoup


def load_config():
    """Load configuration from medium-config.json"""
    config_path = os.path.join(os.path.dirname(__file__), 'medium-config.json')
    with open(config_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def scrape_medium_profile(username):
    """
    Scrape Medium RSS feed for article listings.
    Returns list of dicts: [{'title': ..., 'url': ..., 'date': 'YYYY-MM'}, ...]
    """
    # Medium RSS feed is more reliable than scraping the profile page
    rss_url = f"https://medium.com/feed/@{username}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    print(f"Fetching {rss_url}...")
    response = requests.get(rss_url, headers=headers, timeout=30)
    response.raise_for_status()
    
    soup = BeautifulSoup(response.text, 'xml')
    articles = []
    
    # Parse RSS items
    items = soup.find_all('item')
    print(f"Found {len(items)} items in RSS feed")
    
    for item in items:
        title_elem = item.find('title')
        link_elem = item.find('link')
        pubdate_elem = item.find('pubDate')
        
        if not title_elem or not link_elem:
            continue
        
        title = title_elem.get_text(strip=True)
        url = link_elem.get_text(strip=True)
        
        # Parse publication date
        article_date = None
        if pubdate_elem:
            pubdate_str = pubdate_elem.get_text(strip=True)
            try:
                # RSS pubDate format: "Wed, 23 Oct 2025 12:34:56 GMT"
                dt = datetime.strptime(pubdate_str, '%a, %d %b %Y %H:%M:%S %Z')
                article_date = dt.strftime('%Y-%m')
            except Exception as e:
                print(f"  Could not parse date '{pubdate_str}': {e}")
        
        # Default to current month if no date
        if not article_date:
            article_date = datetime.now().strftime('%Y-%m')
        
        articles.append({
            'title': title,
            'url': url,
            'date': article_date
        })
    
    print(f"Parsed {len(articles)} articles from RSS feed")
    return articles


def extract_date_from_article(url, headers):
    """Fetch individual article page to extract publication date"""
    try:
        resp = requests.get(url, headers=headers, timeout=15)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, 'html.parser')
        
        # Look for <time> with datetime attribute
        time_elem = soup.find('time')
        if time_elem:
            datetime_attr = time_elem.get('datetime')
            if datetime_attr:
                dt = datetime.fromisoformat(datetime_attr.replace('Z', '+00:00'))
                return dt.strftime('%Y-%m')
        
        # Look for meta property with publication date
        meta_date = soup.find('meta', property='article:published_time')
        if meta_date:
            content = meta_date.get('content')
            if content:
                dt = datetime.fromisoformat(content.replace('Z', '+00:00'))
                return dt.strftime('%Y-%m')
                
    except Exception as e:
        print(f"  Could not extract date from {url}: {e}")
    
    return None


def normalize_medium_url(url):
    """
    Normalize Medium URL by removing query params and extracting article slug.
    Returns just the article slug for comparison (e.g., "article-name-abc123")
    """
    # Remove query parameters
    url = url.split('?')[0]
    
    # Extract the article slug (last part after final /)
    # Medium URLs end with: username/article-title-hexid or just article-title-hexid
    parts = url.rstrip('/').split('/')
    if parts:
        slug = parts[-1]
        # Return the slug for comparison
        return slug
    
    return url


def parse_existing_articles(html_content):
    """Parse index.html to find existing Medium articles"""
    existing = set()
    
    # Match Medium article rows: [M] type + Medium URL
    pattern = r'<tr><td class="type">\[M\]</td><td class="title"><a href="(https://[^"]*medium\.com[^"]*)"'
    matches = re.finditer(pattern, html_content)
    
    for match in matches:
        url = match.group(1)
        normalized = normalize_medium_url(url)
        existing.add(normalized)
    
    print(f"Found {len(existing)} existing Medium articles in index.html")
    return existing


def format_article_row(article):
    """Format an article dict as an HTML table row"""
    title = article['title'].replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')
    url = article['url']
    date_str = article['date']
    
    # Parse date for display (e.g., "2025-10" -> "Oct 2025")
    try:
        dt = datetime.strptime(date_str, '%Y-%m')
        display_date = dt.strftime('%b %Y')
    except:
        display_date = date_str
    
    row = f'          <tr><td class="type">[M]</td><td class="title"><a href="{url}" target="_blank" rel="noopener">{title}</a></td><td class="date" data-date="{date_str}">{display_date}</td></tr>'
    return row


def update_index_html(new_articles):
    """Insert new articles into index.html after the first Medium article"""
    index_path = os.path.join(os.path.dirname(__file__), 'index.html')
    
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find insertion point: after the first [M] row in writing section
    # We'll insert right after the first Medium article row
    pattern = r'(<tr><td class="type">\[M\]</td><td class="title">.*?</tr>)'
    match = re.search(pattern, content, re.DOTALL)
    
    if not match:
        print("ERROR: Could not find Medium article insertion point in index.html")
        return False
    
    insertion_point = match.end()
    
    # Build new rows
    new_rows = '\n'.join([format_article_row(a) for a in new_articles])
    
    # Insert
    updated_content = content[:insertion_point] + '\n' + new_rows + content[insertion_point:]
    
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print(f"✓ Added {len(new_articles)} new article(s) to index.html")
    return True


def main():
    """Main entry point"""
    config = load_config()
    username = config.get('medium_username')
    
    if not username:
        print("ERROR: medium_username not found in medium-config.json")
        return 1
    
    # Scrape Medium
    articles = scrape_medium_profile(username)
    
    if not articles:
        print("No articles found on Medium profile")
        return 0
    
    # Read existing index.html
    index_path = os.path.join(os.path.dirname(__file__), 'index.html')
    with open(index_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    existing_urls = parse_existing_articles(html_content)
    
    # Filter for new articles (normalize URLs for comparison)
    new_articles = []
    for article in articles:
        normalized_url = normalize_medium_url(article['url'])
        if normalized_url not in existing_urls:
            new_articles.append(article)
    
    if not new_articles:
        print("✓ No new articles to add")
        return 0
    
    print(f"\nNew articles to add:")
    for article in new_articles:
        print(f"  - {article['title']} ({article['date']})")
    
    # Update index.html
    success = update_index_html(new_articles)
    
    return 0 if success else 1


if __name__ == '__main__':
    exit(main())
