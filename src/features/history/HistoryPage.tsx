import { useState } from "react"
import FabSearch from "../../components/FabSearch"
import Loading from "../../components/Loading"
import Notification, { NotificationProps } from "../../components/Notification"
import ScrollTop from "../../components/ScrollTop"
import HistoryAddForm from "./HistoryAddForm"
import HistoryList from "./HistoryList"

export const HistoryPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState({
    message: "",
    severity: "success",
  } as NotificationProps)

  return (
    <div>
      <Loading open={isLoading} />
      <Notification
        message={notification.message}
        severity={notification.severity}
      />
      <HistoryList
        setIsLoading={setIsLoading}
        setNotification={setNotification}
      />
      <FabSearch />
      <ScrollTop />
      <HistoryAddForm
        setIsLoading={setIsLoading}
        setNotification={setNotification}
      />
    </div>
  )
}
