"use strict";

async function displayTopSites() {
  const topSitesContainer = document.getElementById("top-sites-container");

  try {
    const topSites = await browser.topSites.get();

    if (topSites.length === 0) {
      topSitesContainer.textContent = "No top sites to display.";
      return;
    }

    for (const site of topSites) {
      const siteElement = document.createElement("a");
      siteElement.className = "site";
      siteElement.href = site.url;
      siteElement.target = "_blank";

      const iconElement = document.createElement("img");
      iconElement.className = "site-icon";
      // Use a generic icon for now, as favicons can be tricky to get.
      iconElement.src = `https://www.google.com/s2/favicons?domain=${site.url}`;
      iconElement.alt = site.title;

      const titleElement = document.createElement("span");
      titleElement.className = "site-title";
      titleElement.textContent = site.title || site.url;

      siteElement.appendChild(iconElement);
      siteElement.appendChild(titleElement);
      topSitesContainer.appendChild(siteElement);
    }
  } catch (error) {
    console.error("Error getting top sites:", error);
    topSitesContainer.textContent = "Could not retrieve top sites.";
  }
}

displayTopSites();
