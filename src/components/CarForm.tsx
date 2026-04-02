import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import type { Car } from '../types';

type CarFormType = {
    car: Car,
    setCar: React.Dispatch<React.SetStateAction<Car>>,
}

export default function CarForm({car, setCar}: CarFormType) {
  return (
    <DialogContent>
      <TextField
        required
        margin="dense"
        label="Brand"
        value={car.brand}
        onChange={e => setCar({ ...car, brand: e.target.value })}
        fullWidth
        variant="standard"
      />
      <TextField
        required
        margin="dense"
        label="Model"
        value={car.model}
        onChange={e => setCar({ ...car, model: e.target.value })}
        fullWidth
        variant="standard"
      />
      <TextField
        required
        margin="dense"
        label="Color"
        value={car.color}
        onChange={e => setCar({ ...car, color: e.target.value })}
        fullWidth
        variant="standard"
      />
      <TextField
        required
        margin="dense"
        label="Fuel"
        value={car.fuel}
        onChange={e => setCar({ ...car, fuel: e.target.value })}
        fullWidth
        variant="standard"
      />
      <TextField
        required
        margin="dense"
        label="Model Year"
        value={car.modelYear}
        onChange={e => setCar({ ...car, modelYear: parseInt(e.target.value) })}
        fullWidth
        variant="standard"
      />
      <TextField
        required
        margin="dense"
        type="number"
        label="Price (€)"
        value={car.price}
        onChange={e => setCar({ ...car, price: parseFloat(e.target.value) || 0 })}
        fullWidth
        variant="standard"
      />
    </DialogContent>
  )
}