import Banner from "./Banner";
import Promos from "./user/Promos";
import TopRated from "./user/TopRated";


export default function Home() {
  document.body.style = 'background: #080A1A;';
  return (
    <>
    <div className="bg-main container mx-auto min-h-screen px-2 ">
      <Banner/>
      <TopRated/>
      <Promos/>
    </div>
    </>
  );
}
