from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.core.database import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcp_name = Column(String, nullable=False)

    hospital = Column(String, nullable=False)

    specialty = Column(String)

    interaction_type = Column(String)

    notes = Column(String)

    follow_up = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)