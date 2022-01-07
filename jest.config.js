const config = {
    verbose: true,
    transform: {
        '^.+\\.(ts)$': 'ts-jest',
        '^.+\\.(js)$': 'babel-jest',
    },
    transformIgnorePatterns: [],
};

export default config;
