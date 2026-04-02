import { useEffect, useState } from "react";
import type { Car, CarData } from "../types";
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Snackbar from '@mui/material/Snackbar';
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import { fetchCar, saveCar } from "../carapi"; 
 
function CarList() {
  const [cars, setCars] = useState<CarData[]>([]);
  const [open, setOpen] = useState(false);
 
  const columns: GridColDef[] = [
    { field: "brand", width: 200, headerName: "Brand" },
    { field: "model", width: 150, headerName: "Model" },
    { field: "color", headerName: "Color" },
    { field: "fuel", headerName: "Fuel" },
    { field: "modelYear", headerName: "Model year" },
    { field: "price", headerName: "Price (€)" },
    {
      field: "_links.self.href",
      headerName: "",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) =>
        <Button color="error" size="small" onClick={() => handleDelete(params.id as string)}>
          DELETE
        </Button>
    },
    {
        field: "_links.car.href",
        headerName: "",
        sortable: false,
        disableColumnMenu: false,
        renderCell: (params: GridRenderCellParams) => 
            <EditCar car={params.row} handleUpdate={handleUpdate}/>
    }
  ]
 
  const getCars = () => {
    fetchCar()
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error(err));
  }
 
  const handleDelete = (url: string) => {
    if (window.confirm("Are you sure?")) {
      fetch(url, {
        method: "DELETE"
      })
        .then(response => {
          if (!response.ok)
            throw new Error("Error when deleting a car");
 
          return response.json();
        })
        .then(() => {
            getCars();
            setOpen(true);
        })
        .catch(err => console.error(err))
    }
  }
 
  const handleAdd = (car: Car) => {
    saveCar(car)
      .then(() => getCars())
      .catch(err => console.error(err))
  }

  const handleUpdate = (url:string, updatedCar: Car) => {
    fetch(url, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
      },
        body: JSON.stringify(updatedCar)
    })
    .then(response => {
     if (!response.ok)
        throw new Error("Error when editing a car");
     return response.json();
    })
    .then(() => getCars())
    .catch(err => console.error(err))
  }


  useEffect(() => {
    getCars();
  }, []);
 
  return (
    <>
      <Stack sx={{ mt: 2, mb: 2 }} direction="row" >
        <AddCar handleAdd={handleAdd} />
      </Stack>
      <div style={{ width: "95%", height: 500, margin: "auto" }}>
        <DataGrid
          columns={columns}
          rows={cars}
          getRowId={row => row._links.self.href}
          autoPageSize
          rowSelection={false}
        />
      </div>
      <Snackbar 
        open={open} 
        autoHideDuration={3000} 
        message="Car deleted successfully!"
        onClose={() => setOpen(false)}
      />
    </>
  );
}
 
export default CarList;