from models.user import User
from flask_seeder import Seeder


class AdminSeeder(Seeder):
    def run(self):
        user1 = User(
            name = "admin1",
            nik = None,
            email = "admin1@gmail.com",
            password = "admin1",
            town = None,
            gender = "male",
            birth_date = None,
            phone = None,
            picture = None,
            role = "admin"
        )
        user2 = User(
            name = "admin2",
            nik = None,
            email = "admin2@gmail.com",
            password = "admin2",
            town = None,
            gender = "female",
            birth_date = None,
            phone = None,
            picture = None,
            role = "admin"
        )
    
    # $env:FLASK_APP='./server/__init__.py'
    # flask seed run
        
        self.db.session.add(user1)
        self.db.session.add(user2)
        self.db.session.commit()