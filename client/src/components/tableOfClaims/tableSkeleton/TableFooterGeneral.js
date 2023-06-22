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
    <tfoot style={{ backgroundColor: "grey" }} >
      <tr style={{ fontWeight: "700" }}>
        <td>&nbsp;&nbsp;Итого:</td>
        <td onClick={() => showCaimsCommon(true)} style={{ cursor: "pointer" }}>&nbsp;&nbsp;{getSumCommonAll(claims, null)}</td>
        {
          periods.map(period => {
            return <td onClick={() => showCaimsCommon(period.num)} style={{ textAlign: "center", cursor: "pointer" }} key={period.num}>{getSumCommonAll(claims, period.num)}</td>
          })
        }
        <td onClick={() => showCaimsCommon(21)} style={{ textAlign: "center", cursor: "pointer" }}>{getSumCommonAll(claims, 21)}</td>
        <td onClick={() => showCaimsCommon(1095)} style={{ textAlign: "center", cursor: "pointer" }}>{getSumCommonAll(claims, 1095)}</td>
      </tr>
    </tfoot>
  )
}