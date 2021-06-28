<nav className="navbar navbar-expand-md fixed-top" style={navSyle}>
    <button className="link-button navbar-brand">A Friendly Place</button>
    <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
    >
        <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <button className="nav-link link-button">
                    Home <span className="sr-only">(current)</span>
                </button>
            </li>
            <li className="nav-item">
                <button className="nav-link link-button">Friends</button>
            </li>
            <li className="nav-item">
                <button className="nav-link link-button">Jobs</button>
            </li>
            <li className="nav-item">
                <button className="nav-link link-button">Tech Companies</button>
            </li>
            <li className="nav-item dropdown">
                <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="dropdown01"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Dropdown
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdown01">
                    <button className="dropdown-item  link-button">
                        Action
                    </button>
                    <button className="dropdown-item link-button">
                        Another action
                    </button>
                    <button className="dropdown-item  link-button">
                        Something else here
                    </button>
                </div>
            </li>
        </ul>
        <div className="login" style={navSyle.login}>
            <div class="btn-group">
                <button type="button" class="btn" style={navSyle.login}>
                    Register
                </button>
                <button
                    type="button"
                    class="btn dropdown-toggle dropdown-toggle-split"
                    style={navSyle.login}
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div class="dropdown-menu">
                    <a className="dropdown-item" href="/">
                        Login
                    </a>
                    <a className="dropdown-item" href="/">
                        Logout
                    </a>
                </div>
            </div>
        </div>
        <form className="form-inline my-2 my-lg-0">
            <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
            />
            <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
            >
                Search
            </button>
        </form>
    </div>
</nav>;
