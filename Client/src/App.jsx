import Layout from "./components/common/layout/Layout";
import DataGrid from "./components/datagrid/DataGrid";

function App() {
  const columns = [{ header: "Name", dataIdentifier: "name" }];
  const data = [{ name: "YLE 2" }, { name: "CNC 2" }];

  return (
    <>
      <Layout>
        <DataGrid columns={columns} data={data} />
      </Layout>
    </>
  );
}

export default App;
