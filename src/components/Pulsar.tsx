interface pulsarProps {}

const Pulsar = ({}: pulsarProps) => {
    return (
        <div className="h-60 w-60 rounded-full border-white border flex justify-center items-center">
            <div className="rounded-full pulsar"></div>
        </div>
    );
};

export default Pulsar;
