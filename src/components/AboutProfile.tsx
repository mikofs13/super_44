/* eslint-disable @next/next/no-html-link-for-pages -- The persistent scene handles local anchors; these hrefs also work without JavaScript. */
import { profile } from '@/content/profile';
import ProjectPreview from './ProjectPreview';
import styles from '@/app/page.module.css';
export default function AboutProfile() {
  return <div className={styles.aboutProfile}>
    <div className={styles.profileBanner}>{profile.banner.src && <ProjectPreview {...profile.banner}/>}</div>
    <div className={styles.profileIdentity}>
      <div className={styles.portrait}>{profile.photo.src ? <ProjectPreview {...profile.photo}/> : <div className={styles.portraitPlaceholder}><svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="27" r="13"/><path d="M15 70v-9a25 25 0 0 1 50 0v9"/></svg><span>Portrait pending</span></div>}</div>
      <div><h1>{profile.name || 'Meet the developer'}</h1><p>{profile.role || 'Personal introduction coming soon'}</p></div>
    </div>
    <div className={styles.profileBio}>
      <section aria-labelledby="bio-title"><h2 id="bio-title">About</h2>{profile.introduction.length ? profile.introduction.map((paragraph,index)=><p key={index}>{paragraph}</p>) : <p>A personal introduction will be added here, along with a real portrait and background details.</p>}</section>
      <section aria-labelledby="education-title"><h2 id="education-title">Education</h2>{profile.education.length ? profile.education.map((entry,index)=><article className={styles.resumeEntry} key={index}><div className={styles.resumeHeading}><h3>{entry.institution} <small>{entry.location}</small></h3><span>{entry.period}</span></div><p>{entry.qualification}</p></article>) : <p className={styles.note}>Education details coming soon.</p>}</section>
      <section aria-labelledby="experience-title"><h2 id="experience-title">Experience</h2>{profile.experience.length ? profile.experience.map((entry,index)=><article className={styles.resumeEntry} key={index}><div className={styles.resumeHeading}><h3>{entry.organization}</h3><span>{entry.context}</span></div><div className={styles.resumeHeading}><p>{entry.role}</p><span>{entry.period}</span></div>{entry.highlights.length>0&&<ul>{entry.highlights.map((item,i)=><li key={i}>{item}</li>)}</ul>}</article>) : <p className={styles.note}>Experience details coming soon.</p>}</section>
      <div className={styles.profileActions}><a className="button" href="/projects/">View my projects ↗</a><a className="textLink" href="/contact/">Get in touch ↗</a></div>
    </div>
  </div>;
}
