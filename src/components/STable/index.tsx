import React, { CSSProperties } from "react";

const tdStyle = { backgroundColor: "#f44336" };

interface ISTableProps {}

const STable: React.FC<ISTableProps> = (props) => {
  const data = [{ text: 123 }, { text: 123 }, { text: 123 }];

  return (
    <table border={1} cellSpacing={0} style={{ width: "100%", height: 200 }}>
      <tr>
        <td style={tdStyle}>11</td>
        <td>12</td>
        <td style={tdStyle}>13</td>
        <td>14</td>
        <td style={tdStyle}>15</td>
        <td>16</td>
      </tr>
      <tr>
        <td rowSpan={2} style={tdStyle}>
          21
        </td>
        <td>22</td>
        <td style={tdStyle}>23</td>
        <td>24</td>
        <td style={tdStyle}>25</td>
        <td>26</td>
      </tr>
      <tr>
        <td>31</td>
        <td style={tdStyle}>32</td>
        <td>33</td>
        <td style={tdStyle}>34</td>
        <td>35</td>
      </tr>
    </table>
  );
};

export default STable;
