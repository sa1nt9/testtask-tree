import { ToastContainer } from 'react-toastify'
import AddTreeNodeModal from '../widgets/Modals/AddTreeNodeModal'
import Tree from '../widgets/Tree'
import './App.scss'
import EditTreeNodeModal from '../widgets/Modals/EditTreeNodeModal'
import DeleteTreeNodeModal from '../widgets/Modals/DeleteTreeNodeModal'

const App = () => {

    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Tree />
            <AddTreeNodeModal />
            <EditTreeNodeModal />
            <DeleteTreeNodeModal />
        </div>
    )
}

export default App
