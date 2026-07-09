-- 
-- NILSWA Enterprise Cloud 
-- Database Procedures and Functions
-- 

-- Example Function: Automatically advance an application's status
CREATE OR REPLACE FUNCTION advance_registration_status(p_ack_number VARCHAR, p_new_status VARCHAR)
RETURNS BOOLEAN AS $$
DECLARE
    row_count INT;
BEGIN
    UPDATE registrations 
    SET status = p_new_status 
    WHERE ack_number = p_ack_number;
    
    GET DIAGNOSTICS row_count = ROW_COUNT;
    
    IF row_count > 0 THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Example Procedure: Generate a daily report of pending applications (Mock)
CREATE OR REPLACE PROCEDURE generate_pending_applications_report()
LANGUAGE plpgsql
AS $$
BEGIN
    -- Logic to compile pending applications and insert into a reporting table
    -- Or trigger an external notification
    RAISE NOTICE 'Pending applications report generated.';
END;
$$;
