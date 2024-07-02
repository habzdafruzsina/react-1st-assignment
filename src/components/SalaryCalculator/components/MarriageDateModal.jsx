import { Modal, Box, Typography, Input } from "@mui/material";
import { SalaryAndTaxInfos } from "../../../state/SalaryAndTaxInfos";
import { useContext } from "react";

const MarriageDateModal = ({ isOpen, handleClose }) => {
  const { changeMarriageDate, dateOfMarriage, ...rest } =
    useContext(SalaryAndTaxInfos);

  <Modal
    open={isOpen}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Text in a modal
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        A kedvezmény először a házasságkötést követő hónapra vehető igénybe és a
        házassági életközösség alatt legfeljebb 24 hónapon keresztül jár.
      </Typography>
      <Input
        autoFocus={true}
        onChange={(e) => changeMarriageDate(e.target.value)}
        value={dateOfMarriage}
        type="date"
      ></Input>
    </Box>
  </Modal>;
};

export default MarriageDateModal;
