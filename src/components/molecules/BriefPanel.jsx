import { useMemo } from "react";
import PropTypes from "prop-types";
import markdownit from "markdown-it";
import { Sparkle, X } from "@phosphor-icons/react";

const md = markdownit({ html: false, linkify: true, typographer: true });

const defaultLinkOpen = md.renderer.rules.link_open ||
    ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    tokens[idx].attrSet("target", "_blank");
    tokens[idx].attrSet("rel", "noopener noreferrer");
    return defaultLinkOpen(tokens, idx, options, env, self);
};

export const BriefPanel = ({ status, result, onRetry, onClose }) => {
    const html = useMemo(() => (result?.answer ? md.render(result.answer) : ""), [result]);

    if (status === "idle" && !result) return null;

    const label = result
        ? (result.count === 1 ? "Brief" : `Brief of ${result.count} stories`)
        : "Brief";

    return (
        <section className="nw-brief" aria-live="polite" aria-busy={status === "loading"}>
            <header className="nw-brief__head">
                <span className="nw-brief__label">
                    <Sparkle size={14} weight="fill" />
                    {label}
                </span>
                <button
                    type="button"
                    className="nw-icon-btn nw-icon-btn--sm"
                    onClick={onClose}
                    aria-label="Dismiss brief">
                    <X size={16} />
                </button>
            </header>
            {status === "loading" &&
                <div className="nw-brief__loading">
                    <span className="nw-skel nw-skel--line" style={{ width: "92%" }} />
                    <span className="nw-skel nw-skel--line" style={{ width: "78%" }} />
                    <span className="nw-skel nw-skel--line" style={{ width: "85%" }} />
                    <span className="nw-visually-hidden">Writing your brief</span>
                </div>}
            {status === "error" &&
                <p className="nw-brief__error">
                    The brief did not come through.{" "}
                    <button type="button" className="nw-text-btn" onClick={onRetry}>Try again</button>
                </p>}
            {result &&
                <>
                    {result.title && <p className="nw-brief__about" dir="auto">{result.title}</p>}
                    <div
                        className="nw-brief__body"
                        dir="auto"
                        dangerouslySetInnerHTML={{ __html: html }} />
                </>}
        </section>
    );
};

BriefPanel.propTypes = {
    status: PropTypes.string.isRequired,
    result: PropTypes.shape({
        answer: PropTypes.string,
        count: PropTypes.number,
        title: PropTypes.string,
    }),
    onRetry: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};
