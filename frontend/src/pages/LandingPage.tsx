 import { Link } from "react-router-dom";

import "../styles/landing.css";

function LandingPage() {

    return (
        <div className="landing-page">

            <header className="landing-navbar">

                <div className="brand">
                    Postpartum Support Tracker
                </div>

                <nav className="landing-nav">

                    <Link
                        className="nav-login"
                        to="/login"
                    >
                        Log In
                    </Link>

                    <Link
                        className="nav-register"
                        to="/register"
                    >
                        Create Account
                    </Link>

                </nav>

            </header>


            <main>

                <section className="hero-section">

                    <div className="hero-text">

                        <p className="hero-label">
                            Postpartum support,
                            organized with care
                        </p>

                        <h1>
                            A supportive space for
                            your postpartum journey.
                        </h1>

                        <p className="hero-description">
                            Record how you're feeling,
                            keep important observations
                            organized, and stay connected
                            with the people you trust.
                        </p>

                        <div className="hero-buttons">

                            <Link
                                className="primary-button"
                                to="/register"
                            >
                                Create Your Account
                            </Link>

                            <Link
                                className="secondary-button"
                                to="/login"
                            >
                                Log In
                            </Link>

                        </div>

                    </div>


                    <div className="hero-card">

                        <div className="mini-card pink-card">

                            <span className="mini-icon">
                                ♡
                            </span>

                            <div>

                                <h3>
                                    Daily Check-Ins
                                </h3>

                                <p>
                                    Record mood, sleep,
                                    physical feelings,
                                    medication, and notes.
                                </p>

                            </div>

                        </div>


                        <div className="mini-card peach-card">

                            <span className="mini-icon">
                                ☀
                            </span>

                            <div>

                                <h3>
                                    Organized Timeline
                                </h3>

                                <p>
                                    Keep important moments
                                    together in one place.
                                </p>

                            </div>

                        </div>


                        <div className="mini-card lavender-card">

                            <span className="mini-icon">
                                ◌
                            </span>

                            <div>

                                <h3>
                                    Trusted Support
                                </h3>

                                <p>
                                    Invite people you trust
                                    to contribute observations.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                <section className="how-section">

                    <p className="section-label">
                        HOW IT WORKS
                    </p>

                    <h2>
                        Support should not feel scattered.
                    </h2>

                    <p className="section-description">
                        The Postpartum Support &
                        Observation Tracker brings
                        important information together
                        so experiences and observations
                        are easier to remember and review.
                    </p>


                    <div className="feature-grid">

                        <div className="feature-card">

                            <div className="number">
                                01
                            </div>

                            <h3>
                                Check in with yourself
                            </h3>

                            <p>
                                Record moods, sleep,
                                medication status,
                                physical feelings,
                                and personal notes.
                            </p>

                        </div>


                        <div className="feature-card">

                            <div className="number">
                                02
                            </div>

                            <h3>
                                Build a trusted circle
                            </h3>

                            <p>
                                Invite trusted family
                                members or friends to
                                document what they
                                personally observe.
                            </p>

                        </div>


                        <div className="feature-card">

                            <div className="number">
                                03
                            </div>

                            <h3>
                                See the bigger picture
                            </h3>

                            <p>
                                View self check-ins and
                                observations together
                                in an organized timeline.
                            </p>

                        </div>

                    </div>

                </section>


                <section className="control-section">

                    <div className="control-card">

                        <div>

                            <p className="section-label">
                                MOTHER-CONTROLLED
                            </p>

                            <h2>
                                Your information.
                                Your support circle.
                            </h2>

                        </div>

                        <p>
                            The mother remains at the
                            center of the platform.
                            She controls who is invited
                            and who can access her
                            postpartum support space.
                        </p>

                    </div>

                </section>


                <section className="disclaimer-section">

                    <h2>
                        Built to organize,
                        not diagnose.
                    </h2>

                    <p>
                        This platform does not diagnose
                        medical conditions or decide
                        what an observation means.
                        Its purpose is to help important
                        information stay organized,
                        timestamped, and easier to share.
                    </p>

                </section>


                <section className="final-cta">

                    <h2>
                        Ready to create your
                        postpartum support space?
                    </h2>

                    <p>
                        Start documenting your journey
                        and building your trusted
                        support circle.
                    </p>

                    <div className="hero-buttons">

                        <Link
                            className="primary-button"
                            to="/register"
                        >
                            Create Account
                        </Link>

                        <Link
                            className="secondary-button"
                            to="/login"
                        >
                            Log In
                        </Link>

                    </div>

                </section>

            </main>


            <footer className="landing-footer">

                <p>
                    Postpartum Support &
                    Observation Tracker
                </p>

                <p>
                    Supporting communication,
                    documentation, and care.
                </p>

            </footer>

        </div>
    );
}

export default LandingPage;