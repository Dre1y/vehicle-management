CREATE TABLE vehicle (
    id UUID PRIMARY KEY,
    model VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(100) NOT NULL,
    year CHAR(4) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE car (
    id UUID PRIMARY KEY,
    door_quantity INT NOT NULL,
    fuel_type VARCHAR(30) NOT NULL,
    FOREIGN KEY (id) REFERENCES vehicle(id) ON DELETE CASCADE
);

CREATE TABLE motorcycle (
    id UUID PRIMARY KEY,
    engine_displacement INT NOT NULL,
    FOREIGN KEY (id) REFERENCES vehicle(id) ON DELETE CASCADE
);
