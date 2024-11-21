const ButtonWidget = ({ onClick, children }) => (
    <button
        onClick={ onClick }
        style={{
            padding: "8px 12px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
        }}
    >
        { children }
    </button>
);

export default ButtonWidget;