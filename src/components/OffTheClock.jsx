import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "../hooks/useSectionInView";
import "./OffTheClock.css";

const music = [
  {
    title: "In Rainbows",
    artist: "Radiohead",
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/dd/50/c7/dd50c790-99ac-d3d0-5ab8-e3891fb8fd52/634904032463.png/100x100bb.jpg",
  },
  {
    title: "Never Enough",
    artist: "Daniel Caesar",
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/24/4f/ec/244fec58-ea20-e0b0-eea6-e06c6aff948b/23UMGIM14483.rgb.jpg/100x100bb.jpg",
  },
  {
    title: "Troupeau Bleu",
    artist: "Cortex",
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/72/9d/7a/729d7a9c-8b95-35e6-ac3d-7f54ce400ace/cover.jpg/100x100bb.jpg",
  },
];

const books = [
  {
    title: "Dune Messiah",
    author: "Frank Herbert",
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Publication113/v4/89/bc/8d/89bc8d21-8dd7-75a0-ea6e-8ae136e87318/9781101157879.jpg/100x100bb.jpg",
  },
  {
    title: "Greatest Hits",
    author: "Harlan Ellison",
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/91/95/ac/9195ac34-4ad9-f76a-3f05-bb90b42f919c/9781454952121.jpg/100x100bb.jpg",
  },
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Publication/v4/62/69/b2/6269b227-8903-9dcf-3b4a-e419853472bf/crime_and_punishment.jpg/100x100bb.jpg",
  },
];

/**
 * Compact human-touch strip between Skills and Contact: professionalism
 * leads the page, personality closes it.
 */
const OffTheClock = () => {
  const [ref, inView] = useSectionInView();

  return (
    <section className="off-the-clock" ref={ref}>
      <motion.div
        className="otc-card glass"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <div className="otc-heading">
          <span className="otc-label">Off the clock</span>
          <p className="otc-line">
            Instrumental music, travel, and (usually) the Dune series. Got a
            song or book recommendation? <a href="#contact">Send it over</a>.
          </p>
        </div>

        <div className="otc-groups">
          <div className="otc-group">
            <h4>On repeat</h4>
            <div className="otc-row">
              {music.map((item) => (
                <figure key={item.title} className="otc-item">
                  <img
                    src={item.cover}
                    alt={`${item.title} — ${item.artist}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>
                    <span className="otc-item-title">{item.title}</span>
                    <span className="otc-item-sub">{item.artist}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="otc-group">
            <h4>Currently reading</h4>
            <div className="otc-row">
              {books.map((item) => (
                <figure key={item.title} className="otc-item">
                  <img
                    src={item.cover}
                    alt={`${item.title} — ${item.author}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>
                    <span className="otc-item-title">{item.title}</span>
                    <span className="otc-item-sub">{item.author}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default OffTheClock;
