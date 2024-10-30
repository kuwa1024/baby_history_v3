import { useNavigate } from "react-router-dom"
import FabSearch from "../../components/FabSearch"
import FabUp from "../../components/FabUp"
import BottomForm from "./BottomForm"
import HistoryList from "./HistoryList"

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
      <HistoryList />
      <FabSearch />
      <FabUp />
      <BottomForm />
    </div>
  )
}
