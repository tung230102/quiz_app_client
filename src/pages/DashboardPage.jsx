import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CommonButton, CommonTable } from "~/common";
import { checkPermission } from "~/utils";
import Dashboard from "../features/admin/Dashboard";

function DashboardPage({ authPermissions }) {
  const hasCreatePermission = checkPermission(authPermissions, "create");
  const hasUpdatePermission = checkPermission(authPermissions, "update");
  const hasRemovePermission = checkPermission(authPermissions, "delete");

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "age", headerName: "Age" },
    {
      field: "action",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <>
          <CommonButton
            disabled={!hasUpdatePermission}
            color="warning"
            startIcon={<EditIcon />}
            variant="text"
            onClick={() => alert(`Update ${params.row.id}`)}
          />
          <CommonButton
            disabled={!hasRemovePermission}
            color="error"
            startIcon={<DeleteIcon />}
            variant="text"
            onClick={() => alert("Remove")}
          />
        </>
      ),
    },
  ];

  const rows = [
    { name: "Nguyen", age: 20 },
    { name: "Huy", age: 21 },
    { name: "Tung", age: 22 },
  ];

  const rowsData = rows.map((row, index) => ({
    ...row,
    id: index + 1,
  }));

  return (
    <Dashboard>
      <CommonTable
        columns={columns}
        rows={rowsData}
        onChange={() => {}}
        dropdownContent={
          <div>
            <p>Row 1</p>
            <p>Row 2</p>
            <p>Row 3</p>
          </div>
        }
      >
        <CommonButton disabled={!hasCreatePermission} startIcon={<AddIcon />}>
          Create new
        </CommonButton>
      </CommonTable>
    </Dashboard>
  );
}

export default DashboardPage;
