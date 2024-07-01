import Image from "next/image";


export default function Home() {
  return (
    <main 
   className="homepagecss">
    <div className="container">

    <ul>
          <li>
            <a href="/about" className="rainbow-button">
              About Me
            </a>
          </li>
          <li>
            <a href="/gallery" className="rainbow-button">
              My Gallery
            </a>
          </li>
          <li>
            <a href="/contact" className="rainbow-button">
              My Contacts
            </a>
          </li>
          <li>
            <a href="/wishes" className="rainbow-button">
              My Wishes
            </a>
          </li>
        </ul>
    </div>


  

 
  
</main>


  );
}
