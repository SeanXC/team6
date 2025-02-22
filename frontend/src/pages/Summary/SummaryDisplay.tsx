import React from 'react';

interface Summary {
    _id: string;
    filename: string;
    summary: string;
}

interface SummaryDisplayProps {
    summarizedDocs: Summary[];
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summarizedDocs }) => {
    return (
        <div className="bg-gray-700 p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Summarized Documents</h2>
            {summarizedDocs.length === 0 ? (
                <p className="text-gray-300">No summaries available.</p>
            ) : (
                <ul className="space-y-4">
                    {summarizedDocs.map((doc) => (
                        <li key={doc._id} className="bg-gray-800 p-3 rounded-lg shadow-md">
                            <h3 className="font-semibold text-blue-400">{doc.filename}</h3>
                            <p className="text-gray-200 mt-2">{doc.summary}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SummaryDisplay;