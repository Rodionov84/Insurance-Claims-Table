import preloader from "../../imgs/waves.gif";

export function StartPreloader() {
  return <>
    <div className="start-preloader">
      <img src={preloader} alt="Preloader..." />
    </div>
  </>
}