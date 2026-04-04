


const AlertPage = () => {
    const handleClick = () => {
        alert('Button clicked!');
    };

    return (
        <div >
            <h1>
                alert page
            </h1>
            <button onClick={handleClick}>
            click me
            </button>
        </div>
    );
};

export default AlertPage;