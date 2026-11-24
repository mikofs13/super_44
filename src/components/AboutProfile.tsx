/* eslint-disable @next/next/no-html-link-for-pages -- The persistent scene handles local routes, which also work without JavaScript. */
import { profile } from '@/content/profile';
import type { Activity } from '@/content/profile-schema';
import ProjectPreview from './ProjectPreview';
import styles from '@/app/page.module.css';
import application from './AboutProfile.module.css';

function ExperienceList({ entries }: { entries: Activity[] }) {
  return entries.map(entry => (
    <article className={application.entry} key={`${entry.organization}-${entry.role}`}>
      <div className={application.entryHeading}>
        <h3>{entry.role}</h3>
        <span>{entry.period}</span>
      </div>
      <p className={application.organization}>{entry.organization}{entry.context && ` · ${entry.context}`}</p>
      {entry.commitment && <p className={application.commitment}>{entry.commitment}</p>}
      {entry.highlights.length > 0 && (
        <ul>{entry.highlights.map(item => <li key={item}>{item}</li>)}</ul>
      )}
    </article>
  ));
}

export default function AboutProfile() {
  const { name, role, introduction, photo, banner, education, honors, experience } = profile;

  return (
    <div className={styles.aboutProfile}>
      <header className={application.masthead}>
        <div className={application.identity}>
          {photo.src && <div className={application.portrait}><ProjectPreview {...photo}/></div>}
          <div className={application.identityText}>
            <h1>{name || 'Meet the developer'}</h1>
            {role && <p>{role}</p>}
          </div>
        </div>
        {banner.src && <div className={application.banner}><ProjectPreview {...banner}/></div>}
      </header>
      <div className={application.content}>
        {education.length > 0 && (
          <section className={application.section} aria-labelledby="education-title">
            <h2 id="education-title">Education</h2>
            {education.map(entry => (
              <article className={application.entry} key={`${entry.institution}-${entry.period}`}>
                <div className={application.entryHeading}>
                  <h3>{entry.institution}</h3>
                  <span>{entry.period}</span>
                </div>
                <p>{entry.qualification}{entry.location && ` · ${entry.location}`}</p>
                {!!entry.results?.length && (
                  <dl className={application.results}>
                    {entry.results.map(result => (
                      <div key={result.label}>
                        <dt>{result.label}</dt>
                        <dd>{result.value}{result.detail && <small>{result.detail}</small>}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </article>
            ))}
          </section>
        )}

        {introduction.length > 0 && (
          <section className={application.section} aria-labelledby="bio-title">
            <h2 id="bio-title">About</h2>
            <div className={application.introduction}>
              {introduction.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
        )}

        {!!honors?.length && (
          <section className={application.section} aria-labelledby="honors-title">
            <h2 id="honors-title">Honors &amp; Awards</h2>
            {honors.map(entry => (
              <article className={application.entry} key={`${entry.title}-${entry.period}`}>
                <div className={application.entryHeading}>
                  <h3>{entry.title}</h3>
                  <span>{entry.period}</span>
                </div>
                <p>{entry.context}</p>
              </article>
            ))}
          </section>
        )}

        {experience.length > 0 && (
          <section className={application.section} aria-labelledby="experience-title">
            <h2 id="experience-title">Experience</h2>
            <ExperienceList entries={experience}/>
          </section>
        )}

        <div className={application.actions}>
          <a className="button" href="/projects/">View my projects <span aria-hidden="true">↗</span></a>
          <a className="textLink" href="/activities/">View my activities <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </div>
  );
}

export function ActivitiesProfile() {
  return (
    <div className={application.detail}>
      <h2 className={application.detailTitle}>Activities &amp; Leadership</h2>
      {profile.activities?.length ? <ExperienceList entries={profile.activities}/> : <p>No activities listed yet.</p>}
    </div>
  );
}
