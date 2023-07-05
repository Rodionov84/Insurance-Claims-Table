import { periods } from "../../../imgs/period-icons";
import { getSumCommonAll } from "../../../calculations/get-sum-claims";
import { useNavigate } from "react-router-dom";

export function TableFooterGeneral({claims, setStatePeriod}) {

  const navigate = useNavigate();

  function showCaimsCommon(period = null) {
    setStatePeriod(period);
    navigate("/list-of-claims-common-all");
  }
  return (
    <tfoot className="footer-personal-list" >
      <tr className="arrow-cursor">
        <td>&nbsp;&nbsp;Итого:</td>
        <td onClick={() => showCaimsCommon(true)} className="cells-with-numbers">{getSumCommonAll(claims, null)}</td>
        {
          periods.map(period => {
            return <td onClick={() => showCaimsCommon(period.num)} className="cells-with-numbers" key={period.num}>{getSumCommonAll(claims, period.num)}</td>
          })
        }
        <td onClick={() => showCaimsCommon(21)} className="cells-with-numbers">{getSumCommonAll(claims, 21)}</td>
        <td onClick={() => showCaimsCommon(1095)} className="cells-with-numbers">{getSumCommonAll(claims, 1095)}</td>
      </tr>
    </tfoot>
  )
}