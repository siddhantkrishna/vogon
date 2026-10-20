import { Link } from "react-router-dom";
import { PragyaField } from "@/components/PragyaField";
import { VogonIcon } from "@/components/VogonIcon";
import { pragya } from "@/content/site";

export function PragyaProjectCard() {
  return (
    <Link to={pragya.path} className="pragya-project-card group" aria-label="Explore PRAGYA — Scientific Reasoning by VOGON, Software 002">
      <div className="pragya-project-art">
        <PragyaField />
        <div className="pragya-project-meta eyebrow"><span>VOGON / SOFTWARE {pragya.index}</span><span>PRIVATE ALPHA / SCIENTIFIC INTELLIGENCE</span></div>
        <span className="pragya-project-word" aria-hidden="true">PRAGYA</span>
        <div className="pragya-project-bottom eyebrow"><span>AN INSTRUMENT FOR THINKING</span><span>FIG. 002 / COMPUTATIONAL FIELD</span></div>
      </div>
      <div className="pragya-project-details">
        <p className="eyebrow">PROJECT {pragya.index} <span className="pragya-status">Private alpha / Deployed</span></p>
        <div className="pragya-project-description">
          <div>
            <h3 className="display-md">{pragya.name}</h3>
            <p className="body mt-4 max-w-xl">{pragya.summary}</p>
          </div>
          <span className="label pragya-project-explore">Explore system <span className="arrow arrow-x" aria-hidden="true"><VogonIcon name="arrow-right"/></span></span>
        </div>
      </div>
    </Link>
  );
}
