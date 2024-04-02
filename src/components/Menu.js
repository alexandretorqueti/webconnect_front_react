import { Dropdown } from "react-bootstrap";

function MenuComponent({itens}) {
  return (
    <div className="card-post-toolbar">
            <Dropdown>
                <Dropdown.Toggle variant="bg-transparent">
                <span className="material-symbols-outlined">
                    more_horiz
                </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu m-0 p-0">
                    {itens && itens.map(
                        (item) => {return (
                            (item.visible) &&
                            <Dropdown.Item 
                                key={item.id} 
                                className={`p-3 ${item.enabled ? '' : 'disabled-item'}`} 
                                to="#" 
                                disabled={!item.enabled}
                                onClick={item.action}
                            >
                                <div className="d-flex align-items-top">
                                    <div className="h4 material-symbols-outlined">
                                        <i className={item.icon}></i>
                                    </div>
                                    <div className="data ms-2">
                                        <h6>{item.title}</h6>
                                        <p className="mb-0">{item.content}</p>
                                    </div>
                                </div>
                            </Dropdown.Item>
                        )}
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </div>
  )
}

export default MenuComponent;