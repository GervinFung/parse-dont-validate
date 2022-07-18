module.exports = {
    verbose: true,
    transform: {
        '^.+\\.(ts)$': 'ts-jest',
        '^.+\\.(js)$': 'babel-jest',
    },
    transformIgnorePatterns: [],
};
