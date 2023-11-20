USE ticketAmateur;

DROP TABLE Admins;
DROP TABLE Venues;
DROP TABLE VenueManagers;
DROP TABLE Blocks;
DROP TABLE Shows;
DROP TABLE Seats;



CREATE TABLE Admins (
	auth CHAR(30) PRIMARY KEY
);


CREATE TABLE Venues ( 
	venueID INTEGER(30) PRIMARY KEY,
    venueName CHAR(30)
);

CREATE TABLE VenueManagers (
	auth CHAR(30) PRIMARY KEY,
    venueID INTEGER(30),
    
    CONSTRAINT VenueManagers_venueID_FK FOREIGN KEY (venueID) REFERENCES Venues(venueID)
);


CREATE TABLE Shows ( 
	showID INTEGER(30) PRIMARY KEY,
    venueID INTEGER(30),
    showName CHAR(30),
    showTime INTEGER(30),
    soldOut BOOLEAN,
    activated BOOLEAN,
    
    CONSTRAINT Shows_venueID_FK FOREIGN KEY (venueID) REFERENCES Venues(venueID)
);

CREATE TABLE Blocks (
    startRow INTEGER(10),
    endRow INTEGER(10),
    price INTEGER(10) NOT NULL,
    showID INTEGER(30),
    
    CONSTRAINT PK PRIMARY KEY (startRow, endRow),
    CONSTRAINT Blocks_showID_FK FOREIGN KEY (showID) REFERENCES Shows(showID),
    CONSTRAINT priceGreaterThanZero CHECK (price>0)
);


CREATE TABLE Seats (
	showID INTEGER(30),
    seatRow INTEGER(10),
    seatColumn INTEGER(10),
    seatBought BOOLEAN NOT NULL,
    
    CONSTRAINT PK PRIMARY KEY (showID, seatRow, seatColumn),
    CONSTRAINT Seats_showID_FK FOREIGN KEY (showID) REFERENCES Shows(showID)
);







INSERT INTO Admins VALUES ("234567");




