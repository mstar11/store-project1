import React,{useState} from "react";
import { Link } from "react-router-dom";

const Footer = () => {
        const [text,setText]=useState("");
  return (
    <>
      <div className="footer">
    <section className="fisrtChidefooter">
    <button >
          <i className="fab fa-instagram"></i>
          <Link to="" className="link">
            masoud.safari11
          </Link>
        </button>
        <button>
          <i className="fab fa-telegram"></i>
          <Link to="" className="link">
            m.safari11
          </Link>
        </button>
        <button>
          <i className="fas fa-phone"></i>
          <Link to="" className="link">
            09199498762
          </Link>
        </button>
        <button>
          <i className="fab fa-twitter"></i>
          <Link to="" className="link">
            m.safari11
          </Link>
        </button>
        <button>
          <i className="fab fa-github-square"></i>
          <Link to="https://github.com/m.star11" target="_blank" className="link">
            https://github.com/m.star11
          </Link>
        </button>
        <button>
          <i className="fa-solid fa-at"></i>
          <Link to="star11a80m72@gmail.com" target="_blank"  className="link">
          star11a80m72@gmail.com
          </Link>
        </button>
    </section>
    <section className="comments">
            <label htmlFor="commnets">Comments</label>
            <textarea name="commnets" className="textara" onChange={(e)=>setText(e.target.value)}></textarea>
            <button className="btntext" disabled={text.length} >Send</button>
    </section>
      </div>
    </>
  );
};

export default Footer;
