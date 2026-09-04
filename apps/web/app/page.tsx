import { OnboardingCard } from "../components/onboarding-card";
import { ThemeToggle } from "../components/theme-toggle";

const tastes = ["post-punk", "ambient", "sci-fi", "piano", "indie film"];

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Jamin8r home">
          <span className="brand-grid" aria-hidden="true">
            <i className="brand-red" />
            <i className="brand-cream" />
            <i className="brand-blue" />
            <i className="brand-yellow" />
          </span>
          <span>jamin8r</span>
        </a>
        <nav aria-label="Primary">
          <a href="#idea">Idea</a>
          <a href="#profile">Profile</a>
          <a href="#try-it">Try local</a>
        </nav>
        <ThemeToggle />
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">THE SOCIAL WEB, WITH A POINT OF VIEW</p>
          <h1>
            Your page should feel like <em>you.</em>
          </h1>
          <p className="lede">
            A profile-first social space for music, identity, and surprising
            connections—without flattening everyone into the same feed.
          </p>
          <div className="hero-actions">
            <a className="primary-action link-button" href="#try-it">
              Claim a profile
            </a>
            <a className="text-link" href="#idea">
              See the idea →
            </a>
          </div>
        </div>
        <div
          className="composition"
          aria-label="Abstract geometric composition inspired by modernist grid painting"
        >
          <div className="block cream b1" />
          <div className="block blue b2" />
          <div className="block cream b3" />
          <div className="block red b4" />
          <div className="block cream b5">
            <span>01</span>
            <strong>
              MAKE IT
              <br />
              YOURS.
            </strong>
          </div>
          <div className="block yellow b6" />
          <div className="block cream b7" />
        </div>
      </section>

      <section className="manifesto" id="idea">
        <div className="section-number">01</div>
        <div>
          <p className="eyebrow">WHY JAMIN8R</p>
          <h2>Discovery over engagement bait.</h2>
        </div>
        <p>
          AI helps surface people, music, and communities with meaningful
          overlap. The social experience stays human; the models work backstage.
        </p>
      </section>

      <section className="profile-stage" id="profile">
        <article className="profile-card">
          <div className="profile-banner">
            <span className="mini-block red" />
            <span className="mini-block blue" />
            <span className="mini-block yellow" />
          </div>
          <div className="profile-body">
            <div className="avatar" aria-hidden="true">
              JB
            </div>
            <div>
              <p className="eyebrow">FOUNDING PROFILE</p>
              <h2>Jay</h2>
              <p className="handle">@jay · Los Angeles</p>
            </div>
            <button className="secondary-action">Follow</button>
          </div>
          <p className="profile-bio">
            Backend engineer, pianist, and collector of interesting systems.
            Here for music that leaves a mark and people who still make the web
            weird.
          </p>
          <div className="taste-row">
            {tastes.map((taste) => (
              <span key={taste}>{taste}</span>
            ))}
          </div>
          <div className="now-playing">
            <div className="album-art">
              <span />
            </div>
            <div>
              <p className="eyebrow">ON REPEAT</p>
              <strong>Midnight Architecture</strong>
              <small>fictional demo track · 4:17</small>
            </div>
            <button aria-label="Play demo track">▶</button>
          </div>
        </article>

        <aside className="signal-card">
          <p className="eyebrow">TASTE SIGNAL</p>
          <div className="compatibility">
            <strong>83</strong>
            <span>
              %<br />
              overlap
            </span>
          </div>
          <div className="signal-bar">
            <i style={{ width: "83%" }} />
          </div>
          <p>Strongest shared signals</p>
          <ul>
            <li>experimental music</li>
            <li>science fiction</li>
            <li>independent film</li>
          </ul>
          <p className="muted">
            Recommendation UI is visual-only in v0.1. The backend does not
            expose recommendation endpoints yet.
          </p>
        </aside>
      </section>

      <section className="three-up">
        <article>
          <span className="mini-block red" />
          <p className="eyebrow">EXPRESS</p>
          <h3>Profiles with personality.</h3>
          <p>
            Structured customization keeps pages distinct without turning user
            HTML into a security boundary.
          </p>
        </article>
        <article>
          <span className="mini-block blue" />
          <p className="eyebrow">DISCOVER</p>
          <h3>Similarity with serendipity.</h3>
          <p>
            Graph signals and embeddings can generate candidates; an in-house
            ranker decides what deserves a closer look.
          </p>
        </article>
        <article>
          <span className="mini-block yellow" />
          <p className="eyebrow">CONNECT</p>
          <h3>A social graph you can feel.</h3>
          <p>
            Following is already wired to the backend contract. Realtime events
            and graph projections come next.
          </p>
        </article>
      </section>

      <OnboardingCard />

      <footer>
        <strong>jamin8r</strong>
        <span>Private prototype · v0.1.0</span>
        <span>Make your corner of the internet.</span>
      </footer>
    </main>
  );
}
