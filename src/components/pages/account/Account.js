import "./account.css";
import * as React from "react";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbar,
} from "@mui/x-data-grid";
import axios, { isAxiosError } from "axios";
import { Button, Stack, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDemoData } from "@mui/x-data-grid-generator";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Autocomplete } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function Account() {
  const { data, loading } = useDemoData({
    dataSet: "Commodity",
    rowLength: 4,
    maxColumns: 6,
  });

  const [userData, setUserData] = React.useState([]);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [updateStatus, setUpdateStatus] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  var test = "testing";

  const requestBody = { isActivate: updateStatus, emailAddress: userEmail };

  const [modalFullName, setModalFullName] = React.useState("");
  const [modalBranch, setModalBranch] = React.useState("");
  const [modalEmail, setModalEmail] = React.useState("");
  const [modalPhone, setModalPhone] = React.useState("");

  const [openDialog, setOpenDialog] = React.useState(false);
  const roleAccount = localStorage.getItem("roleAccount"); // Get roleAccount from localStorage
  const allowedRoles = [
    "ACCOUNT SUPERVISOR",
    "OPERATION OFFICER",
    "OPERATION HEAD",
    "COORDINATOR",
  ];
  const isAllowed = allowedRoles.includes(roleAccount); // Check if role is allowed

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [branches, setBranches] = React.useState([
    "PUREGOLD PRICE CLUB - LA TRINIDAD BENGUET",
    "PUREGOLD PRICE CLUB - BAGUIO",
    "PUREGOLD PRICE CLUB - LAOAG",
    "PUREGOLD PRICE CLUB (JR.)- OLD CENTRO",
    "PUREGOLD PRICE CLUB - CONCEPCION TARLAC",
    "PUREGOLD PRICE CLUB - CABANATUAN",
    "PUREGOLD PRICE CLUB - ZARAGOZA",
    "PUREGOLD PRICE CLUB - GAPAN",
    "PUREGOLD PRICE CLUB - CAPAS",
    "PUREGOLD PRICE CLUB - CAUAYAN ISABELA",
    "PUREGOLD PRICE CLUB (JR.)- PALM PLAZA",
    "PUREGOLD PRICE CLUB - PANIQUI",
    "PUREGOLD PRICE CLUB - PUBLIC MARKET",
    "PUREGOLD PRICE CLUB - ROXAS ISABELA",
    "PUREGOLD PRICE CLUB - BALER (N.E)",
    "PUREGOLD PRICE CLUB - MARIA AURORA",
    "PUREGOLD PRICE CLUB - TUMAUINI",
    "PUREGOLD PRICE CLUB (EXTRA.)- TUGUEGARAO",
    "PUREGOLD PRICE CLUB - CENTRO SANTIAGO",
    "PUREGOLD PRICE CLUB - VICTORY NORTE SANTIAGO (N.E)",
    "PUREGOLD PRICE CLUB - VIGAN",
    "PUREGOLD PRICE CLUB - BURNHAM PARK",
    "PUREGOLD PRICE CLUB (JR.)- BAKAKENG",
    "PUREGOLD PRICE CLUB - LA UNION",
    "PUREGOLD PRICE CLUB - BACNOTAN",
    "PUREGOLD PRICE CLUB - CALASIAO",
    "PUREGOLD PRICE CLUB - MANAOAG",
    "PUREGOLD PRICE CLUB - SAN FABIAN",
    "PUREGOLD PRICE CLUB (JR.)- BONUAN",
    "PUREGOLD PRICE CLUB - MAYOMBO",
    "PUREGOLD PRICE CLUB (JR.)- BAYAMBANG",
    "PUREGOLD PRICE CLUB - VILLASIS",
    "PUREGOLD PRICE CLUB - TALAVERA",
    "PUREGOLD PRICE CLUB - SAN JOSE NUEVA ECIJA (N.E)",
    "PUREGOLD PRICE CLUB - ZULUETA (N.E)",
    "PUREGOLD PRICE CLUB - CABANATUAN PALENGKE (N.E)",
    "PUREGOLD PRICE CLUB - PACIFIC MALL (N.E)",
    "PUREGOLD PRICE CLUB - CIRCUMFERENCIAL (N.E)",
    "PUREGOLD PRICE CLUB - CROSSING (N.E)",
    "PUREGOLD PRICE CLUB - GUIMBA",
    "PUREGOLD PRICE CLUB - ILAGAN",
    "PUREGOLD PRICE CLUB - ALIBAGU",
    "PUREGOLD PRICE CLUB - APPARI",
    "PUREGOLD PRICE CLUB - LAL-LO",
    "PUREGOLD PRICE CLUB - TUAO",
    "PUREGOLD PRICE CLUB - SOLANA",
    "PUREGOLD PRICE CLUB - DAU",
    "PUREGOLD PRICE CLUB - DAU ACCESS ROAD",
    "PUREGOLD PRICE CLUB (JR.)- DON JUICO",
    "PUREGOLD PRICE CLUB - MABALACAT",
    "PUREGOLD PRICE CLUB - MAWAQUE",
    "PUREGOLD PRICE CLUB - ANGELES",
    "PUREGOLD PRICE CLUB (JR.)-BALIBAGO",
    "PUREGOLD PRICE CLUB - CENTRAL TOWN",
    "PUREGOLD PRICE CLUB - PANDAN",
    "PUREGOLD PRICE CLUB - SUBIC",
    "PUREGOLD PRICE CLUB - OLONGAPO",
    "PUREGOLD PRICE CLUB - CASTILLEJOS",
    "PUREGOLD PRICE CLUB -DUTY FREE",
    "PUREGOLD PRICE CLUB - FERTUNA",
    "PUREGOLD PRICE CLUB - MAGALANG PAMPANGA",
    "PUREGOLD PRICE CLUB - ANGELES - MAGALANG ROAD EPZA",
    "PUREGOLD PRICE CLUB - ARAYAT PAMPANGA",
    "PUREGOLD PRICE CLUB - MEXICO",
    "PUREGOLD PRICE CLUB -CANDABA",
    "PUREGOLD PRICE CLUB - DINALUPIHAN",
    "PUREGOLD PRICE CLUB (JR.)- ORANI",
    "PUREGOLD PRICE CLUB (JR.)- LUBAO",
    "PUREGOLD PRICE CLUB (JR.)- GUAGUA",
    "PUREGOLD PRICE CLUB (EXTRA.)- FLORIDA BLANCA",
    "PUREGOLD PRICE CLUB (JR.)- PORAC",
    "PUREGOLD PRICE CLUB - MASANTOL",
    "PUREGOLD PRICE CLUB (EXTRA.)- MACABEBE",
    "PUREGOLD PRICE CLUB (JR.)- STO.TOMAS",
    "PUREGOLD PRICE CLUB - SAN SIMON",
    "PUREGOLD PRICE CLUB - MARIVELES",
    "PUREGOLD PRICE CLUB - LIMAY",
    "PUREGOLD PRICE CLUB - BALANGA",
    "PUREGOLD PRICE CLUB (JR.)- ABUCAY",
    "PUREGOLD PRICE CLUB - IBA ZAMBALES",
    "PUREGOLD PRICE CLUB (JR.)- SF 2 CAFÉ FERNANDINO",
    "PUREGOLD PRICE CLUB - BULAON",
    "PUREGOLD PRICE CLUB (JR.)- SF 1 DOLORES",
    "PUREGOLD PRICE CLUB (EXTRA.)- APALIT",
    "PUREGOLD PRICE CLUB - TUNGKONG MANGGA",
    "PUREGOLD PRICE CLUB (JR.)- SAPANG PALAY, SAMPOL",
    "PUREGOLD PRICE CLUB - SAN JOSE DEL MONTE PALMERA",
    "PUREGOLD PRICE CLUB - MEYCAUAYAN BANGA",
    "PUREGOLD PRICE CLUB - MALANDAY",
    "PUREGOLD PRICE CLUB - OBANDO",
    "PUREGOLD PRICE CLUB - BALIWAG",
    "PUREGOLD PRICE CLUB - TANGOS BALIWAG",
    "PUREGOLD PRICE CLUB - DRT HI-WAY (N.E)",
    "PUREGOLD PRICE CLUB - HAGONOY BULACAN",
    "PUREGOLD PRICE CLUB - PAOMBONG",
    "PUREGOLD PRICE CLUB - TABANG GUIGUINTO",
    "PUREGOLD PRICE CLUB - MALOLOS",
    "PUREGOLD PRICE CLUB - SAN MIGUEL BULACAN",
    "PUREGOLD PRICE CLUB - SAN ILDEFONSO",
    "PUREGOLD PRICE CLUB - VALENZUELA-1",
    "PUREGOLD PRICE CLUB - ALIW",
    "PUREGOLD PRICE CLUB - MARILAO PLAZA CECILIA",
    "PUREGOLD PRICE CLUB (JR.)- CALVARIO",
    "PUREGOLD PRICE CLUB (JR.)- CAMALIG",
    "PUREGOLD PRICE CLUB (JR.)- KARUHATAN",
    "PUREGOLD PRICE CLUB (JR.)- MALINTA",
    "PUREGOLD PRICE CLUB - PLARIDEL",
    "PUREGOLD PRICE CLUB - MALOLOS JUNCTION",
    "PUREGOLD PRICE CLUB - GUINGUINTO BAYAN",
    "PUREGOLD PRICE CLUB - BULAKAN,BULAKAN",
    "PUREGOLD PRICE CLUB - STA.MARIA",
    "PUREGOLD PRICE CLUB (JR.)- PANDI",
    "PUREGOLD PRICE CLUB - BOCAUE",
    "PUREGOLD PRICE CLUB - CASA CECILIA",
    "PUREGOLD PRICE CLUB - LIAS MARILAO",
    "PUREGOLD PRICE CLUB (JR.)- LOMA DE GATO",
    "PUREGOLD PRICE CLUB - MUZON",
    "PUREGOLD PRICE CLUB - PASO DE BLAS",
    "PUREGOLD PRICE CLUB (JR.)- LIBERTAD",
    "PUREGOLD PRICE CLUB - LIBERTAD",
    "PUREGOLD PRICE CLUB - SUCAT",
    "PUREGOLD PRICE CLUB - MOONWALK",
    "PUREGOLD MINIMART - DONA SOLEDAD",
    "PUREGOLD PRICE CLUB - REMANVILLE",
    "PUREGOLD PRICE CLUB - SOUTHPARK",
    "PUREGOLD PRICE CLUB (JR.)- BF HOMES",
    "PUREGOLD PRICE CLUB - AGUIRRE",
    "PUREGOLD PRICE CLUB (JR.)- BETTER LIVING",
    "PUREGOLD PRICE CLUB (JR.)- DOROTEO JOSE",
    "PUREGOLD PRICE CLUB (JR.)- CARRIEDO",
    "PUREGOLD PRICE CLUB (JR.)- ESPANA",
    "PUREGOLD PRICE CLUB (JR.)- BUSTILLOS",
    "PUREGOLD PRICE CLUB - 999",
    "PUREGOLD PRICE CLUB (JR.)- JUAN LUNA",
    "PUREGOLD PRICE CLUB - DIVISORIA",
    "PUREGOLD PRICE CLUB - MALATE",
    "PUREGOLD PRICE CLUB - PACO",
    "PUREGOLD PRICE CLUB - PASIG",
    "PUREGOLD PRICE CLUB - TAGUIG",
    "PUREGOLD PRICE CLUB - PARANAQUE-1",
    "PUREGOLD PRICE CLUB (JR.)- BACLARAN",
    "PUREGOLD PRICE CLUB - MAKATI-1",
    "PUREGOLD PRICE CLUB (EXTRA.)- OSMENA",
    "PUREGOLD PRICE CLUB - SAN ANTONIO",
    "PUREGOLD PRICE CLUB - SAN DIONISIO",
    "PUREGOLD PRICE CLUB (JR.)- PANDACAN",
    "PUREGOLD PRICE CLUB (JR.)- BOCOBO",
    "PUREGOLD PRICE CLUB - FTI",
    "PUREGOLD PRICE CLUB (JR.)- TIPAS",
    "PUREGOLD PRICE CLUB (JR.)- USUSAN",
    "PUREGOLD PRICE CLUB (EXTRA.)- TAGUIG HAGONOY",
    "PUREGOLD PRICE CLUB - TAYUMAN-1",
    "PUREGOLD PRICE CLUB - GAGALANGIN",
    "PUREGOLD PRICE CLUB - DV HERBOSA",
    "PUREGOLD PRICE CLUB (JR.)- ZURBARAN",
    "PUREGOLD PRICE CLUB (JR.)- 3RD AVE",
    "PUREGOLD PRICE CLUB (JR.)- BLUMENTRITT CGH",
    "PUREGOLD PRICE CLUB - BLUMENTRITT",
    "PUREGOLD PRICE CLUB - SOUTHGATE",
    "PUREGOLD PRICE CLUB (JR.)- V. MAPA",
    "PUREGOLD PRICE CLUB (JR.)- PUREZA",
    "PUREGOLD PRICE CLUB - STA.MESA",
    "PUREGOLD PRICE CLUB - AGORA",
    "PUREGOLD PRICE CLUB - PULANG LUPA",
    "PUREGOLD PRICE CLUB - LAS PINAS",
    "PUREGOLD PRICE CLUB (JR.)- ZAPOTE ARCADE",
    "PUREGOLD PRICE CLUB - PULANG LUPA UNO",
    "PUREGOLD PRICE CLUB - MOLITO",
    "PUREGOLD PRICE CLUB - PUTATAN",
    "PUREGOLD PRICE CLUB - CASIMIRO",
    "PUREGOLD PRICE CLUB - MARCOS ALVAREZ LAS PINAS",
    "PUREGOLD PRICE CLUB - MINDANAO AVE",
    "PUREGOLD PRICE CLUB - COMMONWEALTH-1",
    "PUREGOLD PRICE CLUB - NORTH COMMONWEALTH",
    "PUREGOLD PRICE CLUB - CALOOCAN",
    "PUREGOLD PRICE CLUB - MONUMENTO",
    "PUREGOLD PRICE CLUB - BALINTAWAK",
    "PUREGOLD PRICE CLUB (JR.)- KALAYAAN",
    "PUREGOLD PRICE CLUB - KANLAON",
    "PUREGOLD PRICE CLUB (JR.)- DEL MONTE",
    "PUREGOLD PRICE CLUB (EXTRA.)- A. BONIFACIO",
    "PUREGOLD PRICE CLUB - MAYPAJO",
    "PUREGOLD PRICE CLUB - MALABON",
    "PUREGOLD PRICE CLUB - NAVOTAS",
    "PUREGOLD PRICE CLUB - CUBAO-1",
    "PUREGOLD PRICE CLUB - Q.I -1",
    "PUREGOLD PRICE CLUB (JR.)- MOTHER IGNACIA",
    "PUREGOLD PRICE CLUB (JR.)- TIMOG",
    "PUREGOLD PRICE CLUB - Q. AVE",
    "PUREGOLD PRICE CLUB (JR.)- WEST AVE.",
    "PUREGOLD PRICE CLUB (EXTRA)- PHILAM",
    "PUREGOLD PRICE CLUB (EXTRA.)- TANDANG SORA",
    "PUREGOLD PRICE CLUB - BAESA",
    "PUREGOLD PRICE CLUB - CROSSROAD",
    "PUREGOLD PRICE CLUB - LANGARAY",
    "PUREGOLD PRICE CLUB (MINIMART.)- LIBIS",
    "PUREGOLD PRICE CLUB - 999 CALOOCAN",
    "AYAGOLD UP TOWN",
    "AYAGOLD NORTH VERTIS",
    "PUREGOLD PRICE CLUB (JR.)- DON ANTONIO",
    "PUREGOLD PRICE CLUB - CULIAT",
    "PUREGOLD PRICE CLUB (JR.)- BALARA",
    "PUREGOLD PRICE CLUB - VISAYAS",
    "PUREGOLD PRICE CLUB (JR.)- QUIRINO HI WAY",
    "PUREGOLD PRICE CLUB - TERRACES",
    "PUREGOLD PRICE CLUB - ZABARTE",
    "PUREGOLD PRICE CLUB - SUSANO",
    "PUREGOLD PRICE CLUB - NITANG",
    "PUREGOLD PRICE CLUB - BAGONG SILANG",
    "PUREGOLD PRICE CLUB - DEPARO",
    "PUREGOLD PRICE CLUB - LANGIT ROAD",
    "PUREGOLD PRICE CLUB - NOVALICHES",
    "PUREGOLD PRICE CLUB (JR.)- ZABARTE",
    "PUREGOLD PRICE CLUB - CAMARIN",
    "PUREGOLD PRICE CLUB - CHAMPACA",
    "PUREGOLD PRICE CLUB - SUPERPALENGKE ANTIPOLO (G)",
    "PUREGOLD PRICE CLUB - AMPID SAN MATEO (G)",
    "PUREGOLD PRICE CLUB (EXTRA.)- AMPID",
    "PUREGOLD PRICE CLUB (EXTRA.)- GUITNANG BAYAN",
    "PUREGOLD PRICE CLUB - SAN RAFAEL",
    "PUREGOLD PRICE CLUB (JR.)- DULONG BAYAN SAN MATEO",
    "PUREGOLD PRICE CLUB - BURGOS",
    "PUREGOLD PRICE CLUB (JR.)- ROSARIO",
    "PUREGOLD PRICE CLUB (JR.)- DE CASTRO",
    "PUREGOLD PRICE CLUB - CONCEPCION",
    "PUREGOLD PRICE CLUB (JR.)- MARIKINA",
    "PUREGOLD PRICE CLUB - TAYTAY",
    "PUREGOLD PRICE CLUB - Q. PLAZA",
    "PUREGOLD PRICE CLUB - JUNCTION",
    "PUREGOLD PRICE CLUB - BINANGONAN",
    "PUREGOLD PRICE CLUB - TAYTAY -2",
    "PUREGOLD PRICE CLUB (JR.)- TAYTAY PALENGKE",
    "PUREGOLD PRICE CLUB (JR.)- TAYTAY ANNEX",
    "PUREGOLD PRICE CLUB - SUMULONG",
    "PUREGOLD PRICE CLUB (JR.)- LILAC",
    "PUREGOLD PRICE CLUB (EXTRA.)- PANORAMA",
    "PUREGOLD PRICE CLUB - AYALA MALL MARIKINA",
    "PUREGOLD PRICE CLUB (EXTRA.)- PARANG",
    "PUREGOLD PRICE CLUB (JR.)- CONCEPCION",
    "PUREGOLD PRICE CLUB (EXTRA.)- STA. ELENA",
    "PUREGOLD PRICE CLUB - ORTIGAS AVE EXT PASIG (G)",
    "PUREGOLD PRICE CLUB - LIGAYA",
    "PUREGOLD PRICE CLUB (JR.)- ORTIGAS EXT EAST SUMMIT",
    "PUREGOLD PRICE CLUB (EXTRA) - BROOKSIDE CAINTA",
    "PUREGOLD PRICE CLUB (JR.)- PAROLA",
    "PUREGOLD PRICE CLUB - TAYTAY FLOODWAY",
    "PUREGOLD PRICE CLUB - MONTALBAN",
    "PUREGOLD PRICE CLUB - SAN MATEO BANABA",
    "PUREGOLD PRICE CLUB - ANGONO",
    "PUREGOLD PRICE CLUB (EXTRA.)- ANGONO HIGH WAY",
    "PUREGOLD PRICE CLUB (EXTRA.)- ANGONO BAYAN",
    "PUREGOLD PRICE CLUB - TANAY",
    "PUREGOLD PRICE CLUB - ANTIPOLO",
    "PUREGOLD PRICE CLUB (JR.)- ANTIPOLO",
    "PUREGOLD PRICE CLUB - EXTRA COGEO",
    "PUREGOLD PRICE CLUB - EASTLAND",
    "PUREGOLD PRICE CLUB - CIRCUMFERENTIAL ROAD",
    "PUREGOLD PRICE CLUB - TERESA",
    "PUREGOLD PRICE CLUB - C. RAYMUNDO",
    "PUREGOLD PRICE CLUB (JR.)- MALINAO PASIG",
    "PUREGOLD PRICE CLUB (JR.)- MERCEDEZ",
    "PUREGOLD PRICE CLUB (JR.)- NANGKA",
    "PUREGOLD PRICE CLUB (JR.)- BATASAN",
    "PUREGOLD PRICE CLUB - KALENTONG",
    "PUREGOLD PRICE CLUB - SHAW",
    "PUREGOLD PRICE CLUB - STA.ROSA BALIBAGO",
    "PUREGOLD PRICE CLUB - VICTORY MALL",
    "PUREGOLD PRICE CLUB - TAGAPO",
    "PUREGOLD PRICE CLUB - SAN PABLO",
    "PUREGOLD PRICE CLUB - STA. CRUZ (G)",
    "PUREGOLD PRICE CLUB - VICTORIA LAGUNA",
    "PUREGOLD PRICE CLUB (MINIMART.)- PILA",
    "PUREGOLD PRICE CLUB - HALANG",
    "PUREGOLD PRICE CLUB - PAGSANJAN",
    "PUREGOLD PRICE CLUB - FAMY",
    "PUREGOLD PRICE CLUB - STA.ROSA BAYAN (G)",
    "PUREGOLD PRICE CLUB - ALAMINOS",
    "PUREGOLD PRICE CLUB - ROXAS MINDORO",
    "PUREGOLD PRICE CLUB - PACITA",
    "PUREGOLD PRICE CLUB (MINIMART.)- VILLA OLYMPIA",
    "PUREGOLD PRICE CLUB (MINIMART.)- MAGSAYSAY",
    "PUREGOLD PRICE CLUB - BINAN",
    "PUREGOLD PRICE CLUB (EXTRA.)- GOLDEN CITY",
    "PUREGOLD PRICE CLUB (JR.)- CROSSTOWN",
    "PUREGOLD PRICE CLUB (JR.)- LOS BANOS",
    "PUREGOLD PRICE CLUB (EXTRA.)- LOS BANOS",
    "PUREGOLD PRICE CLUB (JR.)- PARIAN",
    "PUREGOLD PRICE CLUB - SAN ISIDRO CABUYAO",
    "PUREGOLD PRICE CLUB (JR.)- CANLUBANG",
    "PUREGOLD PRICE CLUB (EXTRA.)- CANLUBANG",
    "PUREGOLD PRICE CLUB (EXTRA.)- MAMATID",
    "PUREGOLD PRICE CLUB (EXTRA.)- CABUYAO BANLIC",
    "PUREGOLD PRICE CLUB - CROSSING CALAMBA",
    "PUREGOLD PRICE CLUB - CALAMBA BAYAN",
    "PUREGOLD PRICE CLUB - CALIHAN HIGHWAY",
    "PUREGOLD PRICE CLUB (EXTRA.)- SAN PABLO",
    "PUREGOLD PRICE CLUB - CANDELARIA",
    "PUREGOLD PRICE CLUB (EXTRA.)- TIAONG",
    "PUREGOLD PRICE CLUB (JR.)- SAN JUAN BATANGAS",
    "PUREGOLD PRICE CLUB - ROSARIO BATANGAS",
    "PUREGOLD PRICE CLUB - LIPA",
    "PUREGOLD PRICE CLUB - TANAUAN",
    "PUREGOLD PRICE CLUB - STO.TOMAS BATANGAS",
    "PUREGOLD PRICE CLUB - CALAUAN",
    "PUREGOLD PRICE CLUB - NEW MARKET BATANGAS (G)",
    "PUREGOLD PRICE CLUB - CALICANTO",
    "PUREGOLD PRICE CLUB - BOAC MARINDUQUE",
    "PUREGOLD PRICE CLUB - LUCENA",
    "PUREGOLD PRICE CLUB - TANZA",
    "PUREGOLD PRICE CLUB - CARMONA",
    "PUREGOLD PRICE CLUB - GMA",
    "PUREGOLD PRICE CLUB - BUCANDALA",
    "PUREGOLD PRICE CLUB - BACOOR",
    "PUREGOLD PRICE CLUB - ANABU",
    "PUREGOLD PRICE CLUB (JR.)- PALIPARAN",
    "PUREGOLD PRICE CLUB (EXTRA.)- MAGDIWANG",
    "PUREGOLD PRICE CLUB (JR.)- MARCOS ALVAREZ",
    "PUREGOLD PRICE CLUB - MOLINO BLVD.",
    "PUREGOLD PRICE CLUB - MOLINO TOWN CENTER",
    "PUREGOLD PRICE CLUB - MOLINO ROAD",
    "PUREGOLD PRICE CLUB - NOVELETA OASIS",
    "PUREGOLD PRICE CLUB - KAWIT",
    "PUREGOLD PRICE CLUB - ROSARIO",
    "PUREGOLD PRICE CLUB - NOVELETA",
    "PUREGOLD PRICE CLUB (EXTRA.)- PRINZA",
    "PUREGOLD DIVIMART - MANGGAHAN",
    "PUREGOLD PRICE CLUB (JR.)- HUGO PEREZ",
    "PUREGOLD DIVIMART - INOCENCIO",
    "PUREGOLD PRICE CLUB - BROOKSIDE LANE",
    "PUREGOLD PRICE CLUB (JR.)- GEN TRIAS",
    "PUREGOLD PRICE CLUB - BUHAY NA TUBIG",
    "PUREGOLD PRICE CLUB - TERMINAL MALL",
    "PUREGOLD PRICE CLUB - DASMARINAS HIGH WAY",
    "PUREGOLD PRICE CLUB (JR.)- DASMA BAYAN",
    "PUREGOLD PRICE CLUB - TANZANG LUMA",
    "PUREGOLD PRICE CLUB (JR.)- GOLDEN CITY",
    "PUREGOLD PRICE CLUB (JR.)- HABAY",
    "PUREGOLD PRICE CLUB - SILANG",
    "PUREGOLD PRICE CLUB (JR.)- TAGAYTAY-A",
    "PUREGOLD PRICE CLUB (EXTRA.)- TAGAYTAY",
    "PUREGOLD PRICE CLUB (JR.)- NAIC",
    "PUREGOLD PRICE CLUB - SAN PEDRO",
    "PUREGOLD PRICE CLUB - LANGGAM",
    "PUREGOLD PRICE CLUB (JR.)- BINAN",
    "PUREGOLD PRICE CLUB - BINAN BAYAN",
    "PUREGOLD PRICE CLUB (EXTRA.)- HALANG",
    "PUREGOLD PRICE CLUB - DIGOS",
    "PUREGOLD PRICE CLUB - TAGUM",
    "PUREGOLD PRICE CLUB - STO.TOMAS",
    "PUREGOLD PRICE CLUB - LANANG",
    "PUREGOLD PRICE CLUB - COTABATO MAIN",
    "PUREGOLD PRICE CLUB - COTABATO FIESTA MALL",
    "PUREGOLD PRICE CLUB - OZAMIS",
    "PUREGOLD PRICE CLUB - CAGAYAN DE ORO",
    "PUREGOLD PRICE CLUB - VALENCIA",
    "PUREGOLD - ILIGAN",
    "PUREGOLD PRICE CLUB - BUTUAN",
    "PUREGOLD PRICE CLUB - LANGIHAN",
    "PUREGOLD JR. ELVINDA",
    "PUREGOLD JUNIOR - CABUYAO BAYAN",
    "PUREGOLD - CALAPAN",
    "PUREGOLD CROSSING EAST",
    "PUREGOLD PRICE CLUB - IRIGA",
    "PUREGOLD PRICE CLUB - PILI",
    "PUREGOLD PRICE CLUB - NAGA DIVERSION",
    "PUREGOLD PRICE CLUB - CENTRO NAGA",
    "PUREGOLD PRICE CLUB - LEGAZPI ALBAY",
    "PUREGOLD PRICE CLUB - SORSOGON",
    "PUREGOLD PRICE CLUB - IROSIN SORSOGON",
    "PUREGOLD PRICE CLUB -GUIHULNGAN",
    "PUREGOLD PRICE CLUB - LIBERTAD BACOLOD",
    "PUREGOLD PRICE CLUB (JR.) -CENTROPLEX",
    "PUREGOLD PRICE CLUB - MANSILINGAN",
    "PUREGOLD PRICE CLUB -PORT BACOLOD",
    "PUREGOLD PRICE CLUB -BATA BACOLOD",
    "PUREGOLD PRICE CLUB -888 CHINA TOWN SQUARE",
    "PUREGOLD PRICE CLUB -HINIGARAN",
    "PUREGOLD PRICE CLUB - KABANKALAN",
    "PUREGOLD PRICE CLUB - BAROTAC VIEJO",
    "PUREGOLD PRICE CLUB - BAROTAC NUEVO",
    "PUREGOLD PRICE CLUB - ESCALANTE",
    "PUREGOLD - CADIZ",
    "PUREGOLD PRICE CLUB - LEGAZPI",
    "PUREGOLD - PONTEVEDRA ROXAS",
    "PUREGOLD PRICE CLUB -BAYBAY GOODSHOP",
    "PUREGOLD PRICE CLUB -PUEBLO DE PANAY",
    "PUREGOLD PRICE CLUB-OTON",
    "PUREGOLD - JARO",
    "PUREGOLD PRICE CLUB - PAVIA",
    "PUREGOLD PRICE CLUB - STA.BARBARA",
    "PUREGOLD PRICE CLUB -SAN CARLOS",
    "PUREGOLD - BAYAWAN",
    "PUREGOLD - LA CASTELLANA",
    "PUREGOLD - CANLAON",
    "PUREGOLD - CALINOG",
    "PUREGOLD PRICE CLUB - MARASBARAS",
    "PUREGOLD PRICE CLUB - REAL TACLOBAN",
    "PUREGOLD PRICE CLUB - CALANIPAWAN",
    "PUREGOLD PRICE CLUB - KANANGA",
    "PUREGOLD PRICE CLUB - CARIGARA",
    "PUREGOLD PRICE CLUB - ABUYOG",
    "PUREGOLD PRICE CLUB - DULAG",
    "PUREGOLD PRICE CLUB - ALANG-ALANG",
    "PUREGOLD PRICE CLUB - PALO",
    "PUREGOLD PRICE CLUB - BORONGAN",
    "PUREGOLD PRICE CLUB - PAGASA BINANGONAN",
    "PUREGOLD PRICE CLUB - DOLORES",
    "PUREGOLD PRICE CLUB - BAYBAY LEYTE",
    "PUREGOLD PRICE CLUB - ORMOC",
    "PUREGOLD PRICE CLUB - SOGOD",
    "PUREGOLD PRICE CLUB - BATO",
    "PUREGOLD PRICE CLUB - ABUCAY",
    "PUREGOLD - MANGO",
    "PUREGOLD - TALISAY",
    "PUREGOLD - GUADALUPE",
    "PUREGOLD- KASAMBAGAN",
    "PUREGOLD PRICE CLUB - SINDALAN",
    "ROYAL DUTY FREE 1",
    "ROYAL DUTY FREE 2",
    "AFPCES - BNS C&X NAVAL GATE 3 FORT BONFACIO",
    "AFPCES - C&X V. LUNA",
    "AFPCES - FB C&X FORT BONIFACIO",
    "AFPCES - MAIN C&X MAIN DRUGSTORE CAMP AGUINALDO",
    "AFPCES - MALACANANG",
    "GAISANO CAPITAL - CASUNTINGAN",
    "GAISANO CAPITAL - DANAO",
    "GAISANO CAPITAL - MACTAN",
    "GAISANO CAPITAL - OPM",
    "GAISANO CAPITAL - SAVER'SMART BASAK",
    "GAISANO CAPITAL - SOUTH",
    "GAISANO CAPITAL - SRP",
    "GAISANO CAPITAL - TISA",
    "GAISANO GRAND - BALAMBAN",
    "GAISANO GRAND - CARCAR",
    "GAISANO GRAND - CORDOVA",
    "GAISANO GRAND - DUMANJUG",
    "GAISANO GRAND - FIESTA MALL",
    "GAISANO GRAND - FIESTA MALL 2",
    "GAISANO GRAND - LILOAN",
    "GAISANO GRAND - MACTAN",
    "GAISANO GRAND - MINGLANILLA",
    "GAISANO GRAND - MOALBOAL",
    "GAISANO GRAND - NORTH BASAK",
    "GAISANO GRAND - TALAMBAN",
    "GAISANO METRO - BANILAD",
    "GAISANO METRO - CANDUMAN",
    "GAISANO METRO - COLON",
    "GAISANO METRO - IT PARK",
    "GAISANO METRO - MANDAUE",
    "GAISANO METRO - NAGA",
    "GAISANO SAVER'SMART - BACAYAN",
    "GAISANO SAVER'SMART - T.PADILLA",
    "METRO FRESH N EASY - SHANGRILA",
    "METRO FRESH N EASY - TABOK",
    "METRO FRESH N EASY - UMAPAD",
    "METRO GAISANO - AYALA",
    "METRO GUN-OB",
    "METRO LG GARDEN",
    "SUPER METRO - BOGO",
    "SUPER METRO - CARCAR",
    "SUPER METRO - OPON",
    "SUPER METRO - TOLEDO",
    "SAVEMORE - EMALL",
    "SAVEMORE - PARKMALL",
    "SM - CONSOLACION",
    "SM - INSULAR",
    "SM - LAPU LAPU",
    "SM - MACTAN",
    "SM - MARIBAGO",
    "SM - SEA SIDE CITY",
    "JEREMYS - LEMERY",
    "RC ALVAREZ - LEMERY",
    "EVER SANTOLAN",
    "EVERPLUS SUPERSTORE INC. - YUSECO",
    "EVERPLUS SUPERSTORE INC. - 10TH AVE.",
    "EVERPLUS SUPERSTORE INC. - 11TH AVE.",
    "EVERPLUS SUPERSTORE INC. - 4TH STATE",
    "EVERPLUS SUPERSTORE INC. - ARLEGUI QUIAPO",
    "EVERPLUS SUPERSTORE INC. - BAESA",
    "EVERPLUS SUPERSTORE INC. - BAGBAG",
    "EVERPLUS SUPERSTORE INC. - BAGONG SILANG",
    "EVERPLUS SUPERSTORE INC. - BAGUMBAYAN",
    "EVERPLUS SUPERSTORE INC. - BAGUMBONG",
    "EVERPLUS SUPERSTORE INC. - BANGKAL",
    "EVERPLUS SUPERSTORE INC. - CAINTA",
    "EVERPLUS SUPERSTORE INC. - CAVITE",
    "EVERPLUS SUPERSTORE INC. - COMMONWEALTH",
    "EVERPLUS SUPERSTORE INC. - CONCEPCION",
    "EVERPLUS SUPERSTORE INC. - DALANDANAN",
    "EVERPLUS SUPERSTORE INC. - FOREST HILL",
    "EVERPLUS SUPERSTORE INC. - GEN.T DE LEON",
    "EVERPLUS SUPERSTORE INC. - HERMOSA",
    "EVERPLUS SUPERSTORE INC. - KAYBIGA",
    "EVERPLUS SUPERSTORE INC. - LANGARAY",
    "EVERPLUS SUPERSTORE INC. - LORETO MORNING BREEZE",
    "EVERPLUS SUPERSTORE INC. - MALIGAYA",
    "EVERPLUS SUPERSTORE INC. - MARULAS",
    "EVERPLUS SUPERSTORE INC. - MASANGKAY",
    "EVERPLUS SUPERSTORE INC. - MAYPAJO",
    "EVERPLUS SUPERSTORE INC. - MAYSAN",
    "EVERPLUS SUPERSTORE INC. - MUZON",
    "EVERPLUS SUPERSTORE INC. - NAVOTAS",
    "EVERPLUS SUPERSTORE INC. - PACO",
    "EVERPLUS SUPERSTORE INC. - PALIPARAN",
    "EVERPLUS SUPERSTORE INC. - PANDACAN",
    "EVERPLUS SUPERSTORE INC. - PANGHULO",
    "EVERPLUS SUPERSTORE INC. - PARANG",
    "EVERPLUS SUPERSTORE INC. - PATEROS",
    "EVERPLUS SUPERSTORE INC. - PEARL DRIVE",
    "EVERPLUS SUPERSTORE INC. - PEÑAFRANCIA",
    "EVERPLUS SUPERSTORE INC. - PINAGBUHATAN",
    "EVERPLUS SUPERSTORE INC. - POLO",
    "EVERPLUS SUPERSTORE INC. - QUIRINO HIWAY",
    "EVERPLUS SUPERSTORE INC. - RETIRO",
    "EVERPLUS SUPERSTORE INC. - ROCES",
    "EVERPLUS SUPERSTORE INC. - SAN MATEO",
    "EVERPLUS SUPERSTORE INC. - SAPANG PALAY",
    "EVERPLUS SUPERSTORE INC. - SAUYO",
    "EVERPLUS SUPERSTORE INC. - SUCAT",
    "EVERPLUS SUPERSTORE INC. - TALIPAPA",
    "EVERPLUS SUPERSTORE INC. - TONDO",
    "EVERPLUS SUPERSTORE INC. - TRABAJO",
    "EVERPLUS SUPERSTORE INC. - TRECE",
    "EVERPLUS SUPERSTORE INC. - VICAS",
    "EVERPLUS SUPERSTORE INC. - ZAPOTE",
    "ISETANN - CARRIEDO",
    "ISETANN - CUBAO",
    "ISETANN - P. TUAZON",
    "ISETANN - RECTO",
    "ISETANN - STA MESA",
    "LANDMARK - ALABANG",
    "LANDMARK - MAKATI",
    "LANDMARK - NUVALI",
    "LANDMARK - TRINOMA COMPLEX",
    "LANDMARK - TRINOMA MAIN",
    "LIANA'S SUPERMARKET - ALABANG",
    "LIANA'S SUPERMARKET - CALAMBA",
    "LIANA'S SUPERMARKET - EVACOM",
    "LIANA'S SUPERMARKET - LEVERIZA",
    "LIANA'S SUPERMARKET - LRT",
    "LIANA'S SUPERMARKET - PASIG",
    "LIANA'S SUPERMARKET - SAMPALOC",
    "LIANA'S SUPERMARKET - SAN PABLO",
    "LIANA'S SUPERMARKET - STO TOMAS",
    "FISHERMALL MALABON",
    "FISHERMALL Q. AVENUE",
    "HI-TOP SUPERMARKET - AURORA BLVD",
    "HI-TOP SUPERMARKET - Q.AVE.",
    "MAKATI SUP. - ALABANG",
    "MERRYMART DOUBLE DRAGON",
    "METRO GAISANO LEGAZPI",
    "METRO GAISANO NAGA",
    "METRO - LUCENA",
    "METRO - ALABANG",
    "METRO - ANTIPOLO",
    "METRO - BINONDO",
    "METRO - FELIZ",
    "METRO - GATE3",
    "METRO - IMUS",
    "METRO - MARKET MARKET",
    "METRO - NEW PORT",
    "METRO - SHAW",
    "METRO - TAGAYTAY",
    "PIONEER CENTRE",
    "STA LUCIA - PHASE1",
    "STA LUCIA - PHASE3",
    "TROPICAL HUT - BF AGUIRRE",
    "TROPICAL HUT - FTI",
    "TROPICAL HUT - PANAY",
    "TROPICAL HUT - SHAW",
    "UNIMART - CAPITAL COMMON PASIG",
    "UNIMART - SAN JUAN",
    "THE MARKETPLACE - MAGALLANES",
    "THE MARKETPLACE - SHANGRI-LA",
    "THE MARKETPLACE - TOMAS MORATO",
    "THE MARKETPLACE - METLIVE",
    "THE MARKETPLACE - PARQAL",
    "THE MARKETPLACE - 30TH",
    "THE MARKETPLACE - ALPHALAND",
    "THE MARKETPLACE - ANTIPOLO",
    "THE MARKETPLACE - AYALA",
    "THE MARKETPLACE - AYALA ALABANG",
    "THE MARKETPLACE - BAGUIO",
    "THE MARKETPLACE - BANAWA",
    "THE MARKETPLACE - BGC",
    "THE MARKETPLACE - CDOC",
    "THE MARKETPLACE - CENTURY",
    "THE MARKETPLACE - CORINTHIAN",
    "THE MARKETPLACE - EASTBAY",
    "THE MARKETPLACE - EASTWOOD",
    "THE MARKETPLACE - FESTIVE WALK",
    "THE MARKETPLACE - GALLERIA SELECTION CEBU",
    "THE MARKETPLACE - GATEWAY",
    "THE MARKETPLACE - GREENBELT",
    "THE MARKETPLACE - GROOVE",
    "THE MARKETPLACE - KATIPUNAN",
    "THE MARKETPLACE - MAKATI",
    "THE MARKETPLACE - OAKRIDGE",
    "THE MARKETPLACE - P.GUEVARRA",
    "THE MARKETPLACE - PASEO DE ROXAS",
    "THE MARKETPLACE - ROCKWELL",
    "THE MARKETPLACE - SAN ANTONIO",
    "THE MARKETPLACE - SANTOLAN",
    "THE MARKETPLACE - TWO CENTRAL",
    "THE MARKETPLACE - UPTOWN",
    "THE MARKETPLACE - MAGNOLIA",
    "THE MARKETPLACE - WESTBORROUGH",
    "SOUTH - GROCERS BF",
    "SOUTH BRENT",
    "SOUTH LIPA",
    "SOUTH SUPERMARKET - ALABANG FILINVEST",
    "SOUTH SUPERMARKET - MARIKINA",
    "SOUTH SUPERMARKET - PAMPANGA",
    "SOUTH SUPERMARKET - PASIG",
    "SOUTH SUPERMARKET - STO. TOMAS",
    "SOUTH SUPERMARKET - VALENZUELA",
    "SOUTH SUPERMARKET - LOS BANOS",
    "SOUTH SUPERMARKET - MALOLOS",
    "SOUTH SUPERMARKET - PASEO STA ROSA",
    "SUPER 8 - ALABANG",
    "SUPER 8 - ANGELES",
    "SUPER 8 - ANGONO",
    "SUPER 8 - ANTIPOLO",
    "SUPER 8 - BACLARAN",
    "SUPER 8 - BAGONG SILANG",
    "SUPER 8 - BAGUMBAYAN",
    "SUPER 8 - BALANGA",
    "SUPER 8 - BALINTAWAK",
    "SUPER 8 - BALIUAG",
    "SUPER 8 - BINAN",
    "SUPER 8 - BINANGONAN",
    "SUPER 8 - BLUMENTRITT",
    "SUPER 8 - CAA LAS PINAS",
    "SUPER 8 - CABUYAO",
    "SUPER 8 - CAINTA",
    "SUPER 8 - CAMARIN",
    "SUPER 8 - COGEO",
    "SUPER 8 - COMMONWEALTH",
    "SUPER 8 - DASMARINAS",
    "SUPER 8 - ERMIN GARCIA",
    "SUPER 8 - FARMERS",
    "SUPER 8 - GAGALANGIN",
    "SUPER 8 - GEN. T VALENZUELA",
    "SUPER 8 - GMA",
    "SUPER 8 - GUADALUPE",
    "SUPER 8 - GUAGUA",
    "SUPER 8 - HAGONOY",
    "SUPER 8 - HULONG DUHAT",
    "SUPER 8 - JACKMAN",
    "SUPER 8 - KARUHATAN",
    "SUPER 8 - LA HUERTA",
    "SUPER 8 - LAS PINAS",
    "SUPER 8 - LIBERTAD",
    "SUPER 8 - LIPA",
    "SUPER 8 - LITEX",
    "SUPER 8 - MAKATI",
    "SUPER 8 - MALIBAY",
    "SUPER 8 - MALOLOS",
    "SUPER 8 - MANAOAG",
    "SUPER 8 - MARULAS",
    "SUPER 8 - MASINAG",
    "SUPER 8 - MOLAVE",
    "SUPER 8 - MOLINO",
    "SUPER 8 - MORONG",
    "SUPER 8 - MUNTINLUPA",
    "SUPER 8 - NAPINDAN",
    "SUPER 8 - NOVA 2",
    "SUPER 8 - ORTIGAS EXT. CAINTA",
    "SUPER 8 - P. BURGOS",
    "SUPER 8 - PACO",
    "SUPER 8 - PRITIL",
    "SUPER 8 - PULILAN",
    "SUPER 8 - RECTO",
    "SUPER 8 - ROSARIO",
    "SUPER 8 - ROSARIO 2",
    "SUPER 8 - SAN JOAQUIN",
    "SUPER 8 - SAN JUAN",
    "SUPER 8 - SAN PABLO",
    "SUPER 8 - SAN PEDRO",
    "SUPER 8 - SAPANG PALAY",
    "SUPER 8 - SHAW",
    "SUPER 8 - SIGNAL (FTI)",
    "SUPER 8 - STA MARIA",
    "SUPER 8 - STA ROSA",
    "SUPER 8 - SUCAT 2",
    "SUPER 8 - TANAY",
    "SUPER 8 - TANDANG SORA",
    "SUPER 8 - TARLAC 2",
    "SUPER 8 - TATALON",
    "SUPER 8 - TAYTAY 1",
    "SUPER 8 - TAYTAY 2",
    "SUPER 8 - TINAJEROS",
    "SUPER 8 - TRECE",
    "SUPER 8 - URDANETA",
    "WALTERMART - GEN TRIAS",
    "WALTERMART - CANDELARIA",
    "WALTERMART - ALTARAZA",
    "WALTERMART - ANTIPOLO",
    "WALTERMART - BACOOR",
    "WALTERMART - BALANGA BATAAN",
    "WALTERMART - BALAYAN",
    "WALTERMART - BALIUAG",
    "WALTERMART - BATANGAS",
    "WALTERMART - BEL-AIR",
    "WALTERMART - BICUTAN",
    "WALTERMART - CABANATUAN",
    "WALTERMART - CABUYAO",
    "WALTERMART - CALOOCAN",
    "WALTERMART - CAPAS",
    "WALTERMART - CARMONA",
    "WALTERMART - CONCEPCION",
    "WALTERMART - DASMA",
    "WALTERMART - E.ROD",
    "WALTERMART - GAPAN",
    "WALTERMART - GUIGUINTO",
    "WALTERMART - IMUS",
    "WALTERMART - JUNCTION",
    "WALTERMART - LOS BANOS",
    "WALTERMART - MAKATI",
    "WALTERMART - MAKILING",
    "WALTERMART - MALOLOS",
    "WALTERMART - MUNTINLUPA WEST",
    "WALTERMART - NASUGBU",
    "WALTERMART - NORTH EDSA",
    "WALTERMART - PAMPANGA",
    "WALTERMART - PANIQUI",
    "WALTERMART - PASAY",
    "WALTERMART - PLARIDEL",
    "WALTERMART - SAN JOSE",
    "WALTERMART - SAN PASCUAL",
    "WALTERMART - STA MARIA",
    "WALTERMART - STA. CRUZ",
    "WALTERMART - STA. ROSA",
    "WALTERMART - SUBIC ZAMBALES",
    "WALTERMART - SUCAT",
    "WALTERMART - TAGAYTAY",
    "WALTERMART - TALAVERA",
    "WALTERMART - TANAUAN",
    "WALTERMART - TAYTAY",
    "WALTERMART - TRECE MAR",
    "WALTERMART - VISAYAS AVE",
    "CAPITAL CASUNTINGAN",
    "CAPITAL DANAO",
    "CAPITAL MACTAN",
    "CAPITAL SRP",
    "CAPITAL SVM BASAK",
    "CAPITAL SVM T.PADILLA",
    "CAPITAL TISA",
    "FISHER FRESH SHOP -FISHERFOODS CORP",
    "FISHER RETAIL, INC. - MALABON",
    "FRIENDSHIP SUPERMARKET INC.",
    "GAISANO SOUTH COLON",
    "GRAND BALAMBAN",
    "GRAND CARCAR",
    "GRAND CORDOVA",
    "GRAND DUMANJUG",
    "GRAND LILOAN",
    "GRAND MACTAN",
    "GRAND MANDAUE NORTH",
    "GRAND MINGLANILLA",
    "GRAND MOALBOAL",
    "GRAND TABUNOK",
    "GRAND TALAMBAN",
    "MAGIC ALAMINOS -MG-5",
    "MAGIC BAYAMBANG -MG-22",
    "MAGIC BINMALEY -MG-10",
    "MAGIC CLUB -MG-4",
    "MAGIC LINGAYEN -MG-8",
    "MAGIC MALASIQUE -MG-17",
    "MAGIC MALL -MGM-3",
    "MAGIC MALL SANCARLOS",
    "MAGIC MANAOAG -MG-12",
    "MAGIC MANGALDAN -MG-7",
    "MAGIC MANGATAREM -MG-21",
    "MAGIC POZZORUBIO -MG-19",
    "MAGIC SAN CARLOS -MG-6",
    "MAGIC SAN JOSE 2 -MG-16A",
    "MAGIC SAN JOSE -MG-16",
    "MAGIC TAYUG -MG-18",
    "MAGIC VILLASIS -MG-9",
    "MAGIC ZAMBALES -MG-20",
    "MAGICMALL ANNEX",
    "PIONEER CENTER",
    "SAVEWISE LINGAYEN",
    "SAVEWISE MALASIQUI",
    "SAVEWISE POZORRUBIO",
    "SAVEWISE ROSALES",
    "SAVEWISE TAYUG",
    "STA. LUCIA EAST SUPERMARKET",
    "STA. LUCIA EAST SUPERMARKET -PHASE 3",
    "SUPER MAGIC -MG-3",
    "TROPICAL HUT -BF HOMES",
    "TROPICAL HUT -FTI TAGUIG",
    "AFPCES -AFPMC C&X",
    "AFPCES -CRD C&X",
    "AFPCES -FB C&X",
    "AFPCES -MAIN C&X",
    "AFPCES -MINIMART C&X",
    "AFPCES -PARK C&X",
    "AFPCES -SP C&X",
    "AFPCES -VAB C&X",
    "PUREGOLD PRICE CLUB (JR.)-TRECE MARTIREZ",
    "PUREGOLD PRICE CLUB -CALAMBA",
    "PUREGOLD PRICE CLUB -GEN. TRIAS CAVITE",
    "PUREGOLD PRICE CLUB -IMUS",
    "PUREGOLD PRICE CLUB INC. -GULANG -GULANG",
    "PUREGOLD PRICE CLUB INC. -STA. ROSA",
    "PUREGOLD PRICE CLUB -MOLINO BACOOR",
    "PUREGOLD PRICE CLUB -NEGROS OCCIDENTAL",
    "PUREGOLD PRICE CLUB -PILA POBLACION",
    "PUREGOLD PRICE CLUB -SAN JOSE DEL MONTE BULACAN",
    "PUREGOLD PRICE CLUB -SANTO TOMAS, DAVAO",
    "PUREGOLD PRICE CLUB -STA. RITA",
    "PUREGOLD PRICE CLUB -STA.ROSA II",
    "RUSTANS-30TH",
    "RUSTANS-ANTIPOLO",
    "RUSTANS-CDOC",
    "RUSTANS-CENTURY",
    "RUSTANS-CORITHIANS",
    "RUSTANS-EASTWOOD",
    "RUSTANS-GLOBAL",
    "RUSTANS-GROOVE",
    "RUSTANS-KATIPUNAN",
    "RUSTANS-MAKATI",
    "RUSTANS-P.GUEVARRA",
    "RUSTANS-ROCKWELL",
    "RUSTANS-SAN ANTONIO",
    "RUSTANS-SANTOLAN",
    "RUSTANS-TOMAS MORATO",
    "RUSTANS-TWO CENTRAL",
    "RUSTANS-UPTOWN",
    "SOUTH - GROCER AGUIRRE",
    "SOUTH SUPERMARKET -LIPA",
    "Super 8 Cubao",
    "UNIMART INC.",
    "UNIMART SUPERFOODS CORP.",
    "WALTERMART SUPERMARKET, INC. -PARAÑAQUE",
    "WELLCOME-CABAHUG",
    "WELLCOME-FARMERS",
    "WELLCOME-MANHATTAN",
    "WELLCOME-PARDO",
    "HEAD OFFICE",
    "CLIENT'S OFFICE",
    "Branch",
  ]); //Branches

  // State for the second modal
  const [openBranchModal, setOpenBranchModal] = React.useState(false);
  const handleOpenBranchModal = () => setOpenBranchModal(true);
  const handleCloseBranchModal = () => setOpenBranchModal(false);

  // State for selected branches
  const [selectedBranches, setSelectedBranches] = React.useState([]);

  // Update the branch of the user with the selected branches
  // Update the branch of the user with the selected branches
  const handleBranchSave = async () => {
    try {
      // Update the user's branches with the selected branches
      const response = await axios.put(
        "http://192.168.50.55:8080/update-user-branch",
        {
          emailAddress: modalEmail,
          branches: selectedBranches,
        }
      );

      console.log("User branches updated:", response.data);

      // Update the branch field in the userData state
      const updatedUserData = userData.map((user) => {
        if (user.emailAddress === modalEmail) {
          return {
            ...user,
            Branch: selectedBranches.join(", "), // Update the Branch field
          };
        }
        return user;
      });

      setUserData(updatedUserData); // Set the updated userData state

      // After successful update, you might want to refresh the user data
      getUser();
      setTimeout(() => window.location.reload(), 1000);
      handleCloseBranchModal(); // Close the branch selection modal after saving
    } catch (error) {
      console.error("Error updating user branches:", error);
    }
  };

  const capitalizeWords = (words) => {
    if (!words || !Array.isArray(words)) return [];

    return words.map((word) =>
      word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ""
    );
  };

  const columns = [
    { field: "count", headerName: "#", width: 75 },
    {
      field: "firstName",
      headerName: "FIRST NAME",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "middleName",
      headerName: "MIDDLE NAME",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "lastName",
      headerName: "LAST NAME",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "username",
      headerName: "USERNAME",
      width: 150,
      headerClassName: "bold-header",
    },
    {
      field: "emailAddress",
      headerName: "EMAIL ADDRESS",
      width: 250,
      headerClassName: "bold-header",
    },
    // {
    //   field: "remarks",
    //   headerName: "REMARKS",
    //   width: 150,
    //   headerClassName: "bold-header",
    // },
    {
      field: "contactNum",
      headerName: "CONTACT NUMBER",
      width: 200,
      headerClassName: "bold-header",
    },
    {
      field: "Branch",
      headerName: "OUTLETS",
      width: 300,
      headerClassName: "bold-header",
    },
    {
      field: "isActive",
      headerName: "STATUS",
      headerClassName: "bold-header",
      width: 150,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const status = params.row.isActive;
        const rowEmail = params.row.emailAddress;
        const roleAccount = localStorage.getItem("roleAccount"); // Get role from localStorage

        const onClick = (e) => {
          if (allowedRoles.includes(roleAccount)) {
            setUpdateStatus(params.row.isActive ? false : true); // Set status based on current state
            setUserEmail(params.row.emailAddress);
            handleOpenDialog(); // Open the dialog
          }
        };

        return (
          <>
            {status ? (
              <Stack>
                <ColorButton
                  variant="contained"
                  size="small"
                  style={{
                    width: "50%",
                    marginTop: "13px",
                    backgroundColor: "#0A21C0",
                    color: "#FFFFFF",
                  }}
                  onClick={onClick}
                  disabled={!isAllowed}
                >
                  Active
                </ColorButton>
              </Stack>
            ) : (
              <Stack>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  style={{ width: "50%", marginTop: "13px" }}
                  onClick={onClick}
                  disabled={!isAllowed}
                >
                  Inactive
                </Button>
              </Stack>
            )}
          </>
        );
      },
    },
    {
      field: "action",
      headerClassName: "bold-header",
      headerName: "ACTION",
      width: 90,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClick = (e) => {
          let mFullname = params.row.firstName + " " + params.row.lastName;
          let condition = params.row.middleName;
          let mBranch = params.row.Branch;
          let mEmail = params.row.emailAddress;
          let mPhone = params.row.contactNum;
          if (condition === "Null") {
            mFullname = params.row.firstName + " " + params.row.lastName;
          } else {
            mFullname =
              params.row.firstName +
              " " +
              params.row.middleName +
              " " +
              params.row.lastName;
          }

          setModalFullName(mFullname);
          setModalBranch(mBranch);
          setModalEmail(mEmail);
          setModalPhone(mPhone);

          return handleOpen();
        };

        return (
          <Stack>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={onClick}
              style={{
                width: "50%",
                marginTop: "13px",
                backgroundColor: "#0A21C0",
                color: "#FFFFFF",
              }}
            >
              <PersonIcon />
            </Button>
          </Stack>
        );
      },
    },
  ];

  async function getUser() {
    try {
      // Retrieve the logged-in admin's accountNameBranchManning from localStorage
      const loggedInBranch = localStorage.getItem("accountNameBranchManning");

      console.log("Logged in branch:", loggedInBranch); // Debugging line

      if (!loggedInBranch) {
        console.error("No branch information found for the logged-in admin.");
        return;
      }

      // Split the loggedInBranch string into an array for comparison
      const loggedInBranches = loggedInBranch
        .split(",")
        .map((branch) => branch.trim()); // Trimming whitespace

      // Send request to get all user data
      const response = await axios.post(
        "http://192.168.50.55:8080/get-all-user",
        requestBody
      );

      const data = response.data.data;

      console.log("User data:", data); // Debugging line

      // Filter the data based on the logged-in admin's accountNameBranchManning
      const filteredData = data.filter((item) => {
        console.log("Checking branch for user:", item.accountNameBranchManning); // Debugging line
        // Check if any branch in loggedInBranches matches any branch in item.accountNameBranchManning
        return loggedInBranches.some((branch) =>
          item.accountNameBranchManning.includes(branch)
        );

        //&& item.emailAddress !== "ynsonharold@gmail.com";
      });

      console.log(filteredData, "filtered user data");

      const newData = filteredData.map((data, key) => {
        const capitalizedNames = capitalizeWords([
          data.firstName,
          data.middleName || "",
          data.lastName,
        ]);

        return {
          count: key + 1,
          remarks: data.remarks,
          firstName: capitalizedNames[0],
          middleName: capitalizedNames[1] || "Null",
          lastName: capitalizedNames[2],
          username: data.username,
          Branch: data.accountNameBranchManning,
          emailAddress: data.emailAddress,
          contactNum: data.contactNum,
          isActive: data.isActivate,
        };
      });

      console.log(newData, "filtered and mapped user data");
      setUserData(newData); // Set the filtered data for rendering
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function setStatus() {
    console.log("check body", requestBody);
    await axios
      .put(
        "http://192.168.50.55:8080/update-status",
        requestBody
      )
      .then(async (response) => {
        const data = await response.data.data;

        console.log(data, "status info");
        window.location.reload();
      });
  }

  React.useEffect(() => {
    getUser();
    if (Array.isArray(modalBranch)) {
      setSelectedBranches(modalBranch); // Pre-select branches based on modalBranch
    }
  }, [modalBranch]);

  return (
    <div className="account">
      <Topbar />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            padding: { xs: "10px", sm: "20px" },
            maxWidth: "100%",
            overflow: "auto",
             backgroundColor: "#2C2E3A"
          }}
        >
          {/* Responsive DataGrid */}
          <Box
            sx={{
              height: "100%",
              width: "100%",
              maxHeight: "80vh",
              marginTop: 2,
              overflow: "hidden",
              "& .MuiDataGrid-root": {
                backgroundColor: "#fff",
              },
            }}
          >
            <DataGrid
              rows={userData}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
                columns: {
                  columnVisibilityModel: {
                    address: false,
                    phone: false,
                  },
                },
              }}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  printOptions: { disableToolbarButton: true },
                  csvOptions: { disableToolbarButton: true },
                },
              }}
              loading={!userData.length}
              disableDensitySelector
              disableColumnFilter
              disableColumnSelector
              pageSizeOptions={[5, 10, 20, 50, 100]}
              getRowId={(row) => row.count}
              disableRowSelectionOnClick
            />
          </Box>

          {/* Responsive Modal */}
          <Modal
            open={openModal}
            onClose={handleCloseDialog}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                padding: 4,
                backgroundColor: "white",
                margin: { xs: "10% auto", md: "5% auto" },
                width: { xs: "90%", sm: "70%", md: "50%" },
                boxShadow: 24,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Full Details:
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span className="detailTitle">Full name: </span>
                <span className="detailDescription">{modalFullName}</span>
                <br />
                <span className="detailTitle">Email: </span>
                <span className="detailDescription">{modalEmail}</span>
                <br />
                <span className="detailTitle">Contact Number: </span>
                <span className="detailDescription">{modalPhone}</span>
                <br />
                <span className="detailTitle">Outlets: </span>
                <span className="detailDescription">
                  {Array.isArray(modalBranch)
                    ? modalBranch.join(", ")
                    : modalBranch}
                </span>
                <br />
                <br />
                {/* Button to open branch selection modal */}
                <Button
                  variant="contained"
                  onClick={handleOpenBranchModal}
                  disabled={!isAllowed}
                  sx={{
                    backgroundColor: "#0A21C0",
                    color: "#FFFFFF",
                    "&:hover": {
                      backgroundColor: "0A21C0",
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "rgba(0, 0, 0, 0.26)",
                      color: "rgba(255, 255, 255, 0.5)",
                    },
                  }}
                >
                  Select Outlet
                </Button>
              </Typography>
              <Stack>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                </DialogActions>
              </Stack>
            </Box>
          </Modal>

          {/* Branch Selection Dialog */}
          <Dialog
            open={openBranchModal}
            onClose={handleCloseBranchModal}
            aria-labelledby="branch-dialog-title"
            aria-describedby="branch-dialog-description"
            fullWidth
            maxWidth="md"
          >
            <DialogTitle id="branch-dialog-title">Select Branch</DialogTitle>
            <DialogContent>
              <Autocomplete
                multiple
                id="branches-autocomplete"
                options={branches}
                defaultValue={selectedBranches}
                onChange={(event, value) => setSelectedBranches(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select Branch"
                    placeholder="Select Branch"
                  />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseBranchModal}>Cancel</Button>
              <Button onClick={handleBranchSave} autoFocus>
                Save
              </Button>
            </DialogActions>
          </Dialog>

          {/* Account Activation Dialog */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Account Activation
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {updateStatus
                  ? "Are you sure you want to set this user as active?"
                  : "Are you sure you want to set this user as inactive?"}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={setStatus} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </div>
  );
}

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#000",
  backgroundColor: "#F6FAB9",
  "&:hover": {
    backgroundColor: "#CAE6B2",
  },
}));
