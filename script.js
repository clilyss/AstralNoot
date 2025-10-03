async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error');
  return res.json();
}

(async () => {
  try {
    const user = await fetchJSON('https://api.github.com/users/clilyss');
    document.getElementById('repos').textContent = user.public_repos;

    // Fetch all repos to compute total stars and forks
    const repos = await fetchJSON('https://api.github.com/users/clilyss/repos?per_page=100');
    const totals = repos.reduce((t, r) => {
      t.stars += r.stargazers_count;
      t.forks += r.forks_count;
      return t;
    }, { stars: 0, forks: 0 });

    document.getElementById('stars').textContent = totals.stars;
    document.getElementById('forks').textContent = totals.forks;
  } catch (err) {
    console.error(err);
  }
})();
