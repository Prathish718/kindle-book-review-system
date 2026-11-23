const SUPABASE_URL = "https://ubnqbatozzwqzsnopbjk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_i0KUsS-IzNtNGqAgptE7VQ_mCu-Q5a-";
const genres = [
  "All books",
  "Fiction",
  "Mystery",
  "Adventure",
  "Romance",
  "Science fiction",
  "Historical",
  "Fantasy",
];
const books = [
  {
    id: "1342",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    description:
      "Elizabeth Bennet and Mr. Darcy learn to look beyond first impressions.",
    mark: "P",
    cover: "c1",
  },
  {
    id: "113",
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    genre: "Fiction",
    description:
      "A lonely girl discovers a locked garden and the beginnings of friendship.",
    mark: "G",
    cover: "c2",
  },
  {
    id: "1661",
    title: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle",
    genre: "Mystery",
    description:
      "Sherlock Holmes and Dr. Watson follow clues through Victorian London.",
    mark: "S",
    cover: "c3",
  },
  {
    id: "35",
    title: "The Time Machine",
    author: "H. G. Wells",
    genre: "Science fiction",
    description: "A Victorian inventor travels far into the future.",
    mark: "T",
    cover: "c5",
  },
  {
    id: "84",
    title: "Frankenstein",
    author: "Mary Shelley",
    genre: "Fiction",
    description:
      "A creator and his creation face the cost of ambition and loneliness.",
    mark: "F",
    cover: "c4",
  },
  {
    id: "345",
    title: "Dracula",
    author: "Bram Stoker",
    genre: "Mystery",
    description:
      "A young solicitor encounters an ancient threat in Transylvania.",
    mark: "D",
    cover: "c8",
  },
  {
    id: "11",
    title: "Alice’s Adventures in Wonderland",
    author: "Lewis Carroll",
    genre: "Fantasy",
    description:
      "Alice follows a white rabbit into a wonderfully strange world.",
    mark: "A",
    cover: "c6",
  },
  {
    id: "514",
    title: "Little Women",
    author: "Louisa May Alcott",
    genre: "Fiction",
    description:
      "The four March sisters grow up, work, and find their own paths.",
    mark: "L",
    cover: "c7",
  },
  {
    id: "120",
    title: "Treasure Island",
    author: "Robert Louis Stevenson",
    genre: "Adventure",
    description:
      "A map leads Jim Hawkins into a dangerous search for buried treasure.",
    mark: "T",
    cover: "c3",
  },
  {
    id: "2701",
    title: "Moby-Dick",
    author: "Herman Melville",
    genre: "Adventure",
    description: "Ishmael joins Captain Ahab on a voyage across the open sea.",
    mark: "M",
    cover: "c8",
  },
  {
    id: "74",
    title: "The Adventures of Tom Sawyer",
    author: "Mark Twain",
    genre: "Adventure",
    description:
      "Tom Sawyer finds trouble, friendship, and adventure along the Mississippi.",
    mark: "T",
    cover: "c5",
  },
  {
    id: "76",
    title: "Adventures of Huckleberry Finn",
    author: "Mark Twain",
    genre: "Adventure",
    description:
      "Huck and Jim travel downriver in search of freedom and a new life.",
    mark: "H",
    cover: "c2",
  },
  {
    id: "46",
    title: "A Christmas Carol",
    author: "Charles Dickens",
    genre: "Fiction",
    description:
      "Ebenezer Scrooge is visited by three spirits on Christmas Eve.",
    mark: "C",
    cover: "c7",
  },
  {
    id: "103",
    title: "Around the World in Eighty Days",
    author: "Jules Verne",
    genre: "Adventure",
    description:
      "Phileas Fogg races around the world to keep a remarkable wager.",
    mark: "W",
    cover: "c4",
  },
  {
    id: "174",
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    genre: "Fiction",
    description:
      "A portrait becomes a record of a life spent chasing pleasure.",
    mark: "D",
    cover: "c6",
  },
  {
    id: "2600",
    title: "War and Peace",
    author: "Leo Tolstoy",
    genre: "Historical",
    description:
      "Several families live through the upheavals of Napoleonic Russia.",
    mark: "W",
    cover: "c8",
  },
  {
    id: "1184",
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    genre: "Adventure",
    description:
      "Wrongfully imprisoned, Edmond Dantès returns to seek justice.",
    mark: "C",
    cover: "c3",
  },
  {
    id: "1260",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    genre: "Romance",
    description: "Jane seeks independence, purpose, and love on her own terms.",
    mark: "J",
    cover: "c1",
  },
  {
    id: "158",
    title: "Emma",
    author: "Jane Austen",
    genre: "Romance",
    description:
      "Emma Woodhouse sets out to arrange other people’s love lives.",
    mark: "E",
    cover: "c5",
  },
  {
    id: "55",
    title: "The Wonderful Wizard of Oz",
    author: "L. Frank Baum",
    genre: "Fantasy",
    description:
      "Dorothy and her friends follow the yellow brick road to the Emerald City.",
    mark: "O",
    cover: "c4",
  },
];
const client =
  SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY && window.supabase
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
    : null;
const state = {
  user: null,
  profile: null,
  books: books.map((b) => ({ ...b, rating: 0, reviewCount: 0, reviews: [] })),
  reviews: [],
  wishlist: [],
  page: "home",
  filter: "All books",
  query: "",
  activeBook: null,
  stars: 0,
  local: readLocal(),
  progress: {},
};
function readLocal() {
  try {
    return JSON.parse(
      localStorage.getItem("kindle-data") ||
        '{"profile":null,"reviews":{},"wishlist":[]}',
    );
  } catch {
    return { profile: null, reviews: {}, wishlist: [] };
  }
}
function saveLocal() {
  localStorage.setItem("kindle-data", JSON.stringify(state.local));
}
function esc(v) {
  return String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
function notify(s) {
  const t = document.querySelector("#toast");
  t.textContent = s;
  t.classList.add("show");
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => t.classList.remove("show"), 2800);
}
function avg(book) {
  return book.reviews.length
    ? book.reviews.reduce((n, r) => n + Number(r.rating), 0) /
        book.reviews.length
    : 0;
}
function sorted(list) {
  return [...list].sort(
    (a, b) =>
      b.rating - a.rating ||
      b.reviewCount - a.reviewCount ||
      a.title.localeCompare(b.title),
  );
}
function cover(b) {
  return (
    '<div class="cover ' +
    b.cover +
    '"><span class="cover-mark">' +
    b.mark +
    '</span><span class="cover-title">' +
    esc(b.title) +
    '</span><span class="cover-author">' +
    esc(b.author) +
    "</span></div>"
  );
}
function rating(b) {
  const stars = Math.round(b.rating);
  return (
    '<div class="rating"><span class="stars ' +
    (b.reviewCount ? "" : "empty") +
    '">' +
    ("★".repeat(stars) + "☆".repeat(5 - stars)) +
    "</span> <span>" +
    b.rating.toFixed(1) +
    " · " +
    b.reviewCount +
    " " +
    (b.reviewCount === 1 ? "review" : "reviews") +
    "</span></div>"
  );
}
function card(b) {
  const saved = state.wishlist.includes(b.id);
  return (
    '<article class="book">' +
    cover(b) +
    '<div class="info"><h3>' +
    esc(b.title) +
    '</h3><div class="author">by ' +
    esc(b.author) +
    " · " +
    esc(b.genre) +
    "</div>" +
    rating(b) +
    '<p class="desc">' +
    esc(b.description) +
    '</p><div class="actions"><button class="button primary small" data-read="' +
    b.id +
    '">' +
    (Number(state.progress[b.id]) > 0 ? "Continue reading" : "Read full book") +
    '</button><button class="button small" data-wish="' +
    b.id +
    '">' +
    (saved ? "♥ Saved" : "♡ Wishlist") +
    "</button></div></div></article>"
  );
}
function topPick() {
  const genre =
    state.filter === "All books"
      ? state.profile?.favorite_genre || "All books"
      : state.filter;
  const eligible = state.books.filter(
    (b) => (genre === "All books" || b.genre === genre) && b.reviewCount > 0,
  );
  return { genre, book: sorted(eligible)[0] || null };
}
function home() {
  const pick = topPick();
  let out =
    '<div class="welcome"><div><div class="eyebrow">A reading room for every day</div><h1 class="heading">Welcome back, ' +
    esc(state.profile?.display_name || "reader") +
    '.</h1><p class="sub">Browse complete classics and share your thoughts.</p></div></div>';
  const inProgress = state.books.find((b) => Number(state.progress[b.id]) > 0);
  if (inProgress)
    out +=
      '<section class="recommend continue-card"><div><div class="eyebrow">Pick up where you left off</div><h2>' +
      esc(inProgress.title) +
      '</h2><p>Your reading place is saved on this device.</p></div><button class="button primary" data-resume="' +
      inProgress.id +
      '">Continue reading</button></section>';
  if (pick.book)
    out +=
      '<section class="recommend"><div><div class="eyebrow">Highest rated in ' +
      esc(pick.genre) +
      "</div><h2>" +
      esc(pick.book.title) +
      "</h2><p>" +
      pick.book.rating.toFixed(1) +
      " from " +
      pick.book.reviewCount +
      " " +
      (pick.book.reviewCount === 1 ? "reader" : "readers") +
      "</p></div>" +
      card(pick.book) +
      "</section>";
  out +=
    '<section class="hero"><div><div class="eyebrow">A quiet place to read</div><h2>Find a story for today.</h2><blockquote>“I declare after all there is no enjoyment like reading!”<cite>— Jane Austen, Pride and Prejudice</cite></blockquote></div><div class="hero-art">' +
    cover(state.books[0]) +
    '</div></section><div class="section-head" id="catalog"><div><h2>The shelves</h2></div><span class="muted">' +
    state.books.length +
    ' books</span></div><div class="filters"><label class="search"><span class="sr-only">Search</span><input id="bookSearch" placeholder="Search title or author" value="' +
    esc(state.query) +
    '"></label>' +
    genres
      .map(
        (g) =>
          '<button class="chip ' +
          (state.filter === g ? "active" : "") +
          '" data-filter="' +
          esc(g) +
          '">' +
          esc(g) +
          "</button>",
      )
      .join("") +
    '</div><div class="grid">' +
    (sorted(
      state.books.filter(
        (b) =>
          (state.filter === "All books" || b.genre === state.filter) &&
          (b.title + " " + b.author)
            .toLowerCase()
            .includes(state.query.toLowerCase()),
      ),
    )
      .map(card)
      .join("") || '<div class="empty">No books match this search.</div>') +
    "</div>";
  return out;
}
function wishlistPage() {
  const saved = state.books.filter((b) => state.wishlist.includes(b.id));
  return (
    '<div class="title-row"><div><div class="eyebrow">Saved for later</div><h1 class="heading">My wishlist</h1><p class="sub">Your saved books in one place.</p></div></div><div class="list">' +
    (saved.map(card).join("") ||
      '<div class="empty">Your wishlist is empty. Save a book from the shelves to see it here.</div>') +
    "</div>"
  );
}
function dashboard() {
  const own = state.reviews.filter(
    (r) => r.user_id === state.user?.id || !client,
  );
  return (
    '<div class="title-row"><div><div class="eyebrow">Your reading activity</div><h1 class="heading">Reading dashboard</h1><p class="sub">Your reviews and finished books.</p></div></div><div class="metrics"><div class="metric"><div class="metric-label">Books finished</div><div class="metric-value">' +
    own.length +
    '</div></div><div class="metric"><div class="metric-label">Books on wishlist</div><div class="metric-value">' +
    state.wishlist.length +
    '</div></div><div class="metric"><div class="metric-label">Reviews written</div><div class="metric-value">' +
    own.length +
    '</div></div><div class="metric"><div class="metric-label">Books in catalog</div><div class="metric-value">' +
    state.books.length +
    '</div></div></div><section class="panel"><h2>Your reviews</h2>' +
    (own
      .map((r) => {
        const b = books.find((x) => x.id === r.book_id);
        return (
          '<div class="activity"><b>' +
          esc(b?.title || "Book") +
          "</b> · " +
          r.rating +
          ' stars<p class="muted">' +
          esc(r.experience) +
          "</p></div>"
        );
      })
      .join("") ||
      '<p class="muted">Your reviews will appear here after you finish a book.</p>') +
    "</section>"
  );
}
function render() {
  document
    .querySelectorAll(".nav-link")
    .forEach((x) =>
      x.classList.toggle("active", x.dataset.page === state.page),
    );
  document.querySelector("#app").innerHTML =
    state.page === "home"
      ? home()
      : state.page === "wishlist"
        ? wishlistPage()
        : dashboard();
  document.querySelector("#profileLabel").textContent =
    state.profile?.display_name || "Sign in";
  document.querySelector("#avatar").textContent = (
    state.profile?.display_name || "+"
  )
    .split(/\s+/)
    .map((x) => x[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
function fillGenres() {
  for (const id of ["authGenre", "profileGenre"])
    document.querySelector("#" + id).innerHTML = genres
      .slice(1)
      .map((g) => "<option>" + esc(g) + "</option>")
      .join("");
}
async function load() {
  if (client) {
    const {
      data: { session },
    } = await client.auth.getSession();
    state.user = session?.user || null;
    state.profile = null;
    state.wishlist = [];
    state.progress = state.user ? {} : { ...state.local.progress };
    if (state.user) {
      const p = await client
        .from("profiles")
        .select("display_name,favorite_genre")
        .eq("id", state.user.id)
        .single();
      state.profile = p.data || {
        display_name: state.user.email.split("@")[0],
        favorite_genre: "Fiction",
      };
      render();
      const [rv, wl] = await Promise.all([
        client
          .from("reviews")
          .select("book_id,rating,experience,user_id,created_at"),
        client.from("wishlists").select("book_id").eq("user_id", state.user.id),
      ]);
      if (rv.error || wl.error) throw rv.error || wl.error;
      state.reviews = rv.data || [];
      state.wishlist = (wl.data || []).map((x) => x.book_id);
      const progress = await client
        .from("reading_progress")
        .select("book_id,position")
        .eq("user_id", state.user.id);
      if (!progress.error)
        state.progress = Object.fromEntries(
          (progress.data || []).map((x) => [x.book_id, Number(x.position)]),
        );
    } else {
      await loadReviews();
    }
  } else {
    state.profile = state.local.profile;
    state.reviews = Object.entries(state.local.reviews || {}).map(
      ([book_id, r]) => ({
        book_id,
        rating: r.rating,
        experience: r.experience,
        user_id: null,
      }),
    );
    state.wishlist = state.local.wishlist || [];
    state.progress = state.local.progress || {};
  }
  for (const b of state.books) {
    b.reviews = state.reviews.filter((r) => r.book_id === b.id);
    b.reviewCount = b.reviews.length;
    b.rating = avg(b);
  }
  render();
}
async function loadReviews() {
  const { data, error } = await client
    .from("reviews")
    .select("book_id,rating,experience,user_id,created_at");
  if (error) return;
  state.reviews = data || [];
  state.books.forEach((b) => {
    b.reviews = state.reviews.filter((r) => r.book_id === b.id);
    b.reviewCount = b.reviews.length;
    b.rating = avg(b);
  });
  render();
}
async function openReader(id) {
  const b = state.books.find((x) => x.id === id);
  if (!b) return;
  state.activeBook = b;
  document.querySelector("#readerTitle").textContent =
    b.title + " — " + b.author;
  document.querySelector("#readerText").textContent = "";
  document.querySelector("#readerStatus").textContent = "Loading pages…";
  const link = "books/" + b.id + ".txt";
  document.querySelector("#readerModal").classList.add("open");
  try {
    const res = await fetch(link);
    if (!res.ok) throw new Error("Pages not loaded.");
    const text = await res.text();
    if (state.activeBook !== b) return;
    if (!/\*\*\*\s*START OF (?:THE|THIS) PROJECT GUTENBERG/i.test(text))
      throw new Error("Pages not loaded.");
    document.querySelector("#readerText").textContent = text;
    document.querySelector("#readerStatus").textContent = "";
    requestAnimationFrame(() => {
      if (state.activeBook !== b) return;
      const position = Math.max(0, Number(state.progress[b.id]) || 0);
      const reader = document.querySelector("#readerText");
      reader.scrollTop = position * (reader.scrollHeight - reader.clientHeight);
    });
  } catch {
    if (state.activeBook === b)
      document.querySelector("#readerStatus").textContent = "Page is not loaded";
  }
}
let progressTimer;
async function saveReadingProgress() {
  clearTimeout(progressTimer);
  if (!state.activeBook) return;
  const reader = document.querySelector("#readerText");
  const range = reader.scrollHeight - reader.clientHeight;
  const position = range > 0 ? reader.scrollTop / range : 0;
  const bookId = state.activeBook.id;
  state.progress[bookId] = position;
  state.local.progress = state.progress;
  try {
    saveLocal();
  } catch {}
  if (client && state.user) {
    await client
      .from("reading_progress")
      .upsert(
        { user_id: state.user.id, book_id: bookId, position },
        { onConflict: "user_id,book_id" },
      );
  }
}
document.querySelector("#readerText").addEventListener("scroll", () => {
  clearTimeout(progressTimer);
  progressTimer = setTimeout(saveReadingProgress, 400);
});
function openReview() {
  if (client && !state.user) {
    notify("Sign in to save a shared rating");
    document.querySelector("#authModal").classList.add("open");
    return;
  }
  document.querySelector("#readerModal").classList.remove("open");
  document.querySelector("#reviewTitle").textContent =
    "How was " + state.activeBook.title + "?";
  state.stars = 0;
  document
    .querySelectorAll("[data-star]")
    .forEach((b) => b.classList.remove("selected"));
  document.querySelector("#experience").value = "";
  document.querySelector("#reviewError").textContent = "";
  document.querySelector("#reviewModal").classList.add("open");
}
document.addEventListener("click", async (e) => {
  const page = e.target.closest("[data-page]");
  if (page) {
    state.page = page.dataset.page;
    render();
    return;
  }
  const filter = e.target.closest("[data-filter]");
  if (filter) {
    state.filter = filter.dataset.filter;
    render();
    return;
  }
  const read = e.target.closest("[data-read]");
  if (read) {
    openReader(read.dataset.read);
    return;
  }
  const resume = e.target.closest("[data-resume]");
  if (resume) {
    openReader(resume.dataset.resume);
    return;
  }
  const wish = e.target.closest("[data-wish]");
  if (wish) {
    const id = wish.dataset.wish;
    try {
      if (client) {
        if (!state.user) {
          notify("Sign in to save a wishlist");
          document.querySelector("#authModal").classList.add("open");
          return;
        }
        const exists = state.wishlist.includes(id);
        const q = exists
          ? client
              .from("wishlists")
              .delete()
              .eq("user_id", state.user.id)
              .eq("book_id", id)
          : client
              .from("wishlists")
              .insert({ user_id: state.user.id, book_id: id });
        const { error } = await q;
        if (error) throw error;
        state.wishlist = exists
          ? state.wishlist.filter((x) => x !== id)
          : [...state.wishlist, id];
      } else {
        state.wishlist = state.wishlist.includes(id)
          ? state.wishlist.filter((x) => x !== id)
          : [...state.wishlist, id];
        state.local.wishlist = state.wishlist;
        saveLocal();
      }
      render();
    } catch (err) {
      notify(err.message || "Could not save wishlist");
    }
    return;
  }
  const star = e.target.closest("[data-star]");
  if (star) {
    state.stars = Number(star.dataset.star);
    document.querySelectorAll("[data-star]").forEach((b) => {
      b.textContent = Number(b.dataset.star) <= state.stars ? "★" : "☆";
      b.classList.toggle("selected", Number(b.dataset.star) <= state.stars);
    });
    return;
  }
  const close = e.target.closest("[data-close]");
  if (close) {
    if (close.dataset.close === "readerModal") {
      await saveReadingProgress();
      state.activeBook = null;
      render();
    }
    document.querySelector("#" + close.dataset.close).classList.remove("open");
    return;
  }
  if (e.target.id === "stopReading") {
    await saveReadingProgress();
    state.activeBook = null;
    document.querySelector("#readerModal").classList.remove("open");
    render();
    return;
  }
  if (e.target.id === "finishReading") {
    openReview();
    return;
  }
  if (e.target.closest("#profileButton")) {
    if (!state.profile && !client) {
      document.querySelector("#profileTitle").textContent =
        "Create your profile";
      document.querySelector("#logoutButton").hidden = true;
    } else if (!state.profile) {
      document.querySelector("#authModal").classList.add("open");
      return;
    }
    document.querySelector("#profileName").value =
      state.profile?.display_name || "";
    document.querySelector("#profileGenre").value =
      state.profile?.favorite_genre || "Fiction";
    document.querySelector("#logoutButton").hidden = !client;
    document.querySelector("#profileModal").classList.add("open");
    return;
  }
  if (e.target.id === "authSwitch") {
    document.querySelector("#authNameRow").hidden = true;
    document.querySelector("#authName").required = false;
    document.querySelector("#authPassword").removeAttribute("minlength");
    document.querySelector("#authError").textContent = "";
    document.querySelector("#authGenreRow").hidden = true;
    document.querySelector("#authTitle").textContent = "Sign in";
    document.querySelector("#authSubmit").textContent = "Sign in";
    document.querySelector("#authPassword").autocomplete = "current-password";
    document.querySelector("#switchPrompt").textContent = "New reader?";
    e.target.textContent = "Create profile";
    e.target.id = "authRegister";
    return;
  }
  if (e.target.id === "authRegister") {
    document.querySelector("#authNameRow").hidden = false;
    document.querySelector("#authName").required = true;
    document.querySelector("#authPassword").minLength = 12;
    document.querySelector("#authError").textContent = "";
    document.querySelector("#authGenreRow").hidden = false;
    document.querySelector("#authTitle").textContent = "Create your profile";
    document.querySelector("#authSubmit").textContent = "Create profile";
    document.querySelector("#authPassword").autocomplete = "new-password";
    document.querySelector("#switchPrompt").textContent =
      "Already have a profile?";
    e.target.textContent = "Sign in";
    e.target.id = "authSwitch";
    return;
  }
  if (e.target.id === "logoutButton") {
    await client.auth.signOut();
    state.profile = null;
    state.user = null;
    state.wishlist = [];
    document.querySelector("#profileModal").classList.remove("open");
    await load();
    return;
  }
});
document.addEventListener("input", (e) => {
  if (e.target.id === "bookSearch") {
    state.query = e.target.value;
    const pos = e.target.selectionStart;
    render();
    const input = document.querySelector("#bookSearch");
    input.focus();
    input.setSelectionRange(pos, pos);
  }
});
document.addEventListener("submit", async (e) => {
  if (e.target.id === "authForm") {
    e.preventDefault();
    const email = document.querySelector("#authEmail").value.trim(),
      password = document.querySelector("#authPassword").value;
    const err = document.querySelector("#authError");
    err.textContent = "";
    try {
      if (client) {
        const isRegister = !document.querySelector("#authNameRow").hidden;
        if (isRegister) {
          const { data, error } = await client.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: window.location.origin + window.location.pathname,
              data: {
                display_name: document.querySelector("#authName").value.trim(),
                favorite_genre: document.querySelector("#authGenre").value,
              },
            },
          });
          if (error) throw error;
          notify(data.session ? "Your profile is ready." : "Check your email to confirm your profile.");
        } else {
          const { error } = await client.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
        }
        document.querySelector("#authModal").classList.remove("open");
        await load();
      } else {
        state.local.profile = {
          display_name: document.querySelector("#authName").value.trim(),
          favorite_genre: document.querySelector("#authGenre").value,
        };
        saveLocal();
        document.querySelector("#authModal").classList.remove("open");
        await load();
      }
    } catch (error) {
      document.querySelector("#authError").textContent =
        error.message || "Could not sign in";
    }
    return;
  }
  if (e.target.id === "profileForm") {
    e.preventDefault();
    const display_name = document.querySelector("#profileName").value.trim(),
      favorite_genre = document.querySelector("#profileGenre").value;
    if (client) {
      const { error } = await client
        .from("profiles")
        .update({ display_name, favorite_genre })
        .eq("id", state.user.id);
      if (error) {
        document.querySelector("#profileError").textContent = error.message;
        return;
      }
    } else {
      state.local.profile = { display_name, favorite_genre };
      saveLocal();
    }
    state.profile = { display_name, favorite_genre };
    document.querySelector("#profileModal").classList.remove("open");
    render();
    return;
  }
  if (e.target.id === "reviewForm") {
    e.preventDefault();
    const experience = document.querySelector("#experience").value.trim(),
      err = document.querySelector("#reviewError");
    if (!state.stars) {
      err.textContent = "Choose a star rating.";
      return;
    }
    if (!experience) {
      err.textContent = "Add a note about your experience.";
      return;
    }
    try {
      if (client) {
        const { error } = await client.from("reviews").upsert(
          {
            user_id: state.user.id,
            book_id: state.activeBook.id,
            rating: state.stars,
            experience,
          },
          { onConflict: "user_id,book_id" },
        );
        if (error) throw error;
      } else {
        state.local.reviews[state.activeBook.id] = {
          rating: state.stars,
          experience,
        };
        saveLocal();
      }
      document.querySelector("#reviewModal").classList.remove("open");
      const finishedBookId = state.activeBook.id;
      delete state.progress[finishedBookId];
      state.local.progress = state.progress;
      try {
        saveLocal();
      } catch {}
      if (client && state.user)
        await client
          .from("reading_progress")
          .delete()
          .eq("user_id", state.user.id)
          .eq("book_id", finishedBookId);
      state.activeBook = null;
      await load();
      notify("Your rating was saved");
    } catch (error) {
      document.querySelector("#reviewError").textContent =
        error.message || "Could not save your review";
    }
  }
});
fillGenres();
document.querySelector("#authGenre").value = "Fiction";
document.querySelector("#profileGenre").value = "Fiction";
document.querySelector("#authForm").addEventListener("submit", () => {});
if (client) {
  client
    .channel("kindle-reviews")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "reviews" },
      () => loadReviews().catch(() => {}),
    )
    .subscribe();
  client.auth.onAuthStateChange(() =>
    setTimeout(() => load().catch((e) => notify(e.message)), 0),
  );
}
load().catch((e) => notify(e.message || "Could not load shared reviews"));
