import { useNavigate } from "react-router-dom"
import BottomForm from "../../components/BottomForm"
import FabSearch from "../../components/FabSearch"
import FabUp from "../../components/FabUp"
import HistoryTable from "../../components/HistoryTable"

export const History = () => {
  const navigate = useNavigate()
  /*
  const [value, loading, error] = useCollection(collection(db, "items"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })
    
      <div>
        <p>
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <span>Collection: Loading...</span>}
          {value && (
            <span>
              Collection:{" "}
              {value.docs.map((doc) => (
                <React.Fragment key={doc.id}>
                  {JSON.stringify(doc.data())},{" "}
                </React.Fragment>
              ))}
            </span>
          )}
        </p>
      </div>
    */
  return (
    <div>
      <button onClick={() => navigate("/signout")}>サインアウト</button>
      <HistoryTable />
      <FabSearch />
      <FabUp />
      <BottomForm />
    </div>
  )
}
