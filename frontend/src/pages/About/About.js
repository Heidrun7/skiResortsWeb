import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="aboutContainer">
      <p>
        Besta veðrið finnur upplýsingar um hvar besta skíðaveðrið á Íslandi er
        að finna og hvenær í vikunni besta skíðaveðrið er á ákveðnum stað. Allar
        veðurupplýsingar eru sóttar af <a href="blika.is">blika.is</a>.
      </p>
      <p>
        Þessi síða er gæluverkefni og umsjónaraðili tekur ekki ábyrgð á
        því að veðurspár reynist réttar eða að notendur missi af góðum skíðadegi
        vegna skekkju í útreikningum.
      </p>
    </div>
  );
};

export default About;
