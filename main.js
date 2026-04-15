
async function fetchUserData() {
  const base = "https://jsonplaceholder.typicode.com";

  const [users, posts, comments, albums, photos, todos] = await Promise.all([
    fetch(`${base}/users`).then((res) => res.json()),
    fetch(`${base}/posts`).then((res) => res.json()),
    fetch(`${base}/comments`).then((res) => res.json()),
    fetch(`${base}/albums`).then((res) => res.json()),
    fetch(`${base}/photos`).then((res) => res.json()),
    fetch(`${base}/todos`).then((res) => res.json()),
  ]);

  const tableBody = document.querySelector("#usersTable tbody");

  users.forEach((user) => {
    const userPosts = posts.filter((p) => p.userId === user.id);
    const postIds = userPosts.map((p) => p.id);

    const userCommentsCount = comments.filter((c) =>
      postIds.includes(c.postId),
    ).length;

    const userAlbums = albums.filter((a) => a.userId === user.id);
    const albumIds = userAlbums.map((a) => a.id);

    const userPhotosCount = photos.filter((ph) =>
      albumIds.includes(ph.albumId),
    ).length;

    const userTodos = todos.filter((t) => t.userId === user.id);
    const completedTodos = userTodos.filter((t) => t.completed).length;
    const pendingTodos = userTodos.length - completedTodos;

    const row = `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${userPosts.length}</td>
                <td>${userCommentsCount}</td>
                <td>${userAlbums.length}</td>
                <td>${userPhotosCount}</td>
                <td>${completedTodos}</td>
                <td>${pendingTodos}</td>
            </tr>
        `;
    tableBody.innerHTML += row;
  });
}

fetchUserData();
