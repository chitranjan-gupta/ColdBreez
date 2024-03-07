import React from "react";

export function Table({ rows }) {
  return (
    <div className="tableview">
      <table className="border">
        {rows.map(({ cells, _key }, i) => (
          <tr key={_key} className="border text-center">
            {i == 0
              ? cells.map((d) => (
                  <th key={d} className="border p-1">
                    {d}
                  </th>
                ))
              : cells.map((d) => (
                  <td key={d} className="border p-1">
                    {d}
                  </td>
                ))}
          </tr>
        ))}
      </table>
    </div>
  );
}
