import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    //OBETER PRATOS DA API DE ADMINISTRAÇÃO
    http
      .get<IPrato[]>("pratos/")
      .then((resposta) => setPratos(resposta.data))

      .catch((erro) => console.log(erro));
  }, []);

  function excluir(prato: IPrato): void {
    http
      .delete(`pratos/${prato.id}/`)
      .then(() => {
        setPratos((prevPratos) =>
          prevPratos.filter((resposta) => resposta.id !== prato.id)
        );
      })
      .catch((erro) => console.log(erro));
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Pratos</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow
              key={prato.nome}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {prato.nome}
              </TableCell>
              <TableCell component="th" scope="row">
                {prato.descricao}
              </TableCell>
              <TableCell component="th" scope="row">
                {prato.tag}
              </TableCell>
              <TableCell component="th" scope="row">
                <a href={prato.imagem} target="_blank" rel="noreferrer"> Ver Imagem </a>
              </TableCell>
              <TableCell>
                   <Link to={`/admin/pratos/${prato.id}`}> Editar </Link> 
              </TableCell>
              <TableCell>
                  <Button variant="outlined" color="error" onClick={() => excluir(prato)}>
                    Excluir
                  </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoPratos;
