import uuid

# In-memory session storage
_sessions = {}


def create_session(data):
    """
    Creates a new session and returns the session ID.
    """
    session_id = str(uuid.uuid4())
    _sessions[session_id] = data
    return session_id


def get_session(session_id):
    """
    Retrieves a session by ID.
    """
    return _sessions.get(session_id)


def update_session(session_id, data):
    """
    Updates an existing session.
    """
    _sessions[session_id] = data


def delete_session(session_id):
    """
    Deletes a session.
    """
    _sessions.pop(session_id, None)