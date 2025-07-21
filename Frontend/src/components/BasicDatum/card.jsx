import PropTypes from 'prop-types';

export default function InfoCard({ title, value }) {
    return (
        <div className="bg-[#161b22] border border-[#238636] rounded-xl p-4 w-60 shadow-md text-white">
            <h2 className="text-sm text-[#8b949e] font-semibold mb-2">{title}</h2>
            <div className="text-2xl text-[#c9d1d9] font-bold">{value}</div>
        </div>
    );
}

InfoCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
