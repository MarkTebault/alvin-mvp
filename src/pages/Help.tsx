import React from "react";

const Help: React.FC = () => {
    return (
        <main className="help-page">
            <header>
                <h1>Help</h1>
                <p aria-live="polite">Placeholder intro text — replace with your help overview.</p>
            </header>

            <section aria-labelledby="getting-started" style={{ marginTop: 24 }}>
                <h2 id="getting-started">Getting started</h2>
                <p>Placeholder: steps for getting started. Replace with detailed instructions.</p>
                <ol>
                    <li>Step 1 — placeholder text</li>
                    <li>Step 2 — placeholder text</li>
                    <li>Step 3 — placeholder text</li>
                </ol>
            </section>

            <section aria-labelledby="faq" style={{ marginTop: 24 }}>
                <h2 id="faq">Frequently asked questions</h2>

                <details>
                    <summary>Question placeholder #1</summary>
                    <p>Answer placeholder #1. Replace with real content.</p>
                </details>

                <details>
                    <summary>Question placeholder #2</summary>
                    <p>Answer placeholder #2. Replace with real content.</p>
                </details>

                <details>
                    <summary>Question placeholder #3</summary>
                    <p>Answer placeholder #3. Replace with real content.</p>
                </details>
            </section>

            <section aria-labelledby="troubleshooting" style={{ marginTop: 24 }}>
                <h2 id="troubleshooting">Troubleshooting</h2>
                <p>Placeholder troubleshooting tips. Replace with specific problems and solutions.</p>
                <ul>
                    <li>Problem placeholder A — placeholder solution</li>
                    <li>Problem placeholder B — placeholder solution</li>
                </ul>
            </section>

            <section aria-labelledby="contact" style={{ marginTop: 24, marginBottom: 48 }}>
                <h2 id="contact">Contact support</h2>
                <p>Placeholder contact instructions. Add email, links, or support form details here.</p>
                <button
                    type="button"
                    onClick={() => {
                        // placeholder action: replace or remove as needed
                        alert("Placeholder: open contact form or copy support address.");
                    }}
                >
                    Contact support
                </button>
            </section>
        </main>
    );
};

export default Help;