CREATE SCHEMA IF NOT EXISTS changelog;
COMMENT ON SCHEMA changelog IS 'Updates of the osm2pgsql database are logged in separate tables for a editing history and quality assurance';

CREATE TABLE changelog.created_point (osm_id bigint, tags hstore, geom geometry(Point,3857), changed date);
CREATE INDEX created_point_geom_index ON changelog.created_point USING gist (geom);
CREATE INDEX created_point_tags_index ON changelog.created_point USING gin (tags);
CREATE INDEX created_point_changed_index ON changelog.created_point (changed);
CREATE INDEX created_point_osm_id_index ON changelog.created_point USING btree (osm_id);

CREATE TABLE changelog.created_line (osm_id bigint, tags hstore, geom geometry(LineString,3857), changed date);
CREATE INDEX created_line_geom_index ON changelog.created_line USING gist (geom);
CREATE INDEX created_line_tags_index ON changelog.created_line USING gin (tags);
CREATE INDEX created_line_changed_index ON changelog.created_line (changed);
CREATE INDEX created_line_osm_id_index ON changelog.created_line USING btree (osm_id);

CREATE TABLE changelog.created_polygon (osm_id bigint, tags hstore, geom geometry(Geometry,3857), changed date);
CREATE INDEX created_polygon_geom_index ON changelog.created_polygon USING gist (geom);
CREATE INDEX created_polygon_tags_index ON changelog.created_polygon USING gin (tags);
CREATE INDEX created_polygon_changed_index ON changelog.created_polygon (changed);
CREATE INDEX created_polygon_osm_id_index ON changelog.created_polygon USING btree (osm_id);

CREATE TABLE changelog.modified_point (osm_id bigint, old_tags hstore, new_tags hstore, old_geom geometry(Point,3857), new_geom geometry(Point,3857), changed date);
CREATE INDEX modified_point_old_geom_index ON changelog.modified_point USING gist (old_geom);
CREATE INDEX modified_point_new_geom_index ON changelog.modified_point USING gist (new_geom);
CREATE INDEX modified_point_old_tags_index ON changelog.modified_point USING gin (old_tags);
CREATE INDEX modified_point_new_tags_index ON changelog.modified_point USING gin (new_tags);
CREATE INDEX modified_point_changed_index ON changelog.modified_point (changed);
CREATE INDEX modified_point_osm_id_index ON changelog.modified_point USING btree (osm_id);

CREATE TABLE changelog.modified_line (osm_id bigint, old_tags hstore, new_tags hstore, old_geom geometry(LineString,3857), new_geom geometry(Point,3857), changed date);
CREATE INDEX modified_line_old_geom_index ON changelog.modified_line USING gist (old_geom);
CREATE INDEX modified_line_new_geom_index ON changelog.modified_line USING gist (new_geom);
CREATE INDEX modified_line_old_tags_index ON changelog.modified_line USING gin (old_tags);
CREATE INDEX modified_line_new_tags_index ON changelog.modified_line USING gin (new_tags);
CREATE INDEX modified_line_changed_index ON changelog.modified_line (changed);
CREATE INDEX modified_line_osm_id_index ON changelog.modified_line USING btree (osm_id);

CREATE TABLE changelog.modified_polygon (osm_id bigint, old_tags hstore, new_tags hstore, old_geom geometry(Geometry,3857), new_geom geometry(Point,3857), changed date);
CREATE INDEX modified_polygon_old_geom_index ON changelog.modified_polygon USING gist (old_geom);
CREATE INDEX modified_polygon_new_geom_index ON changelog.modified_polygon USING gist (new_geom);
CREATE INDEX modified_polygon_old_tags_index ON changelog.modified_polygon USING gin (old_tags);
CREATE INDEX modified_polygon_new_tags_index ON changelog.modified_polygon USING gin (new_tags);
CREATE INDEX modified_polygon_changed_index ON changelog.modified_polygon (changed);
CREATE INDEX modified_polygon_osm_id_index ON changelog.modified_polygon USING btree (osm_id);

CREATE TABLE changelog.deleted_point (osm_id bigint, tags hstore, geom geometry(Point,3857), changed date);
CREATE INDEX deleted_point_geom_index ON changelog.deleted_point USING gist (geom);
CREATE INDEX deleted_point_tags_index ON changelog.deleted_point USING gin (tags);
CREATE INDEX deleted_point_changed_index ON changelog.deleted_point (changed);
CREATE INDEX deleted_point_osm_id_index ON changelog.deleted_point USING btree (osm_id);

CREATE TABLE changelog.deleted_line (osm_id bigint, tags hstore, geom geometry(LineString,3857), changed date);
CREATE INDEX deleted_line_geom_index ON changelog.deleted_line USING gist (geom);
CREATE INDEX deleted_line_tags_index ON changelog.deleted_line USING gin (tags);
CREATE INDEX deleted_line_changed_index ON changelog.deleted_line (changed);
CREATE INDEX deleted_line_osm_id_index ON changelog.deleted_line USING btree (osm_id);

CREATE TABLE changelog.deleted_polygon (osm_id bigint, tags hstore, geom geometry(Geometry,3857), changed date);
CREATE INDEX deleted_polygon_geom_index ON changelog.deleted_polygon USING gist (geom);
CREATE INDEX deleted_polygon_tags_index ON changelog.deleted_polygon USING gin (tags);
CREATE INDEX deleted_polygon_changed_index ON changelog.deleted_polygon (changed);
CREATE INDEX deleted_polygon_osm_id_index ON changelog.deleted_polygon USING btree (osm_id);


CREATE OR REPLACE FUNCTION point_insert_function()
RETURNS trigger AS
$BODY$
	BEGIN
		INSERT INTO changelog.created_point (osm_id, tags, geom, changed)
		VALUES (NEW.osm_id, NEW.tags, NEW.way, CURRENT_DATE);
		RETURN NEW;
	END;
$BODY$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION line_insert_function()
RETURNS trigger AS
$BODY$
	BEGIN
		INSERT INTO changelog.created_line (osm_id, tags, geom, changed)
		VALUES (NEW.osm_id, NEW.tags, NEW.way, CURRENT_DATE);
		RETURN NEW;
	END;
$BODY$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION polygon_insert_function()
RETURNS trigger AS
$BODY$
	BEGIN
		INSERT INTO changelog.created_polygon (osm_id, tags, geom, changed)
		VALUES (NEW.osm_id, NEW.tags, NEW.way, CURRENT_DATE);
		RETURN NEW;
	END;
$BODY$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION point_delete_function()
RETURNS trigger AS
$BODY$
	BEGIN
		INSERT INTO changelog.deleted_point (osm_id, tags, geom, changed)
		VALUES (OLD.osm_id, OLD.tags, OLD.way, CURRENT_DATE);
		RETURN NEW;
	END;
$BODY$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION line_delete_function()
RETURNS trigger AS
$BODY$
	BEGIN
		INSERT INTO changelog.deleted_line (osm_id, tags, geom, changed)
		VALUES (OLD.osm_id, OLD.tags, OLD.way, CURRENT_DATE);
		RETURN NEW;
	END;
$BODY$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION polygon_delete_function()
RETURNS trigger AS
$BODY$
	BEGIN
		INSERT INTO changelog.deleted_polygon (osm_id, tags, geom, changed)
		VALUES (OLD.osm_id, OLD.tags, OLD.way, CURRENT_DATE);
		RETURN NEW;
	END;
$BODY$ LANGUAGE plpgsql;


CREATE TRIGGER point_insert_trigger
AFTER INSERT
ON openrailwaymap_point
FOR EACH ROW
WHEN (NEW.osm_id > 0)
EXECUTE PROCEDURE point_insert_function();

CREATE TRIGGER line_insert_trigger
AFTER INSERT
ON openrailwaymap_line
FOR EACH ROW
WHEN (NEW.osm_id > 0)
EXECUTE PROCEDURE line_insert_function();

CREATE TRIGGER polygon_insert_trigger
AFTER INSERT
ON openrailwaymap_polygon
FOR EACH ROW
WHEN (NEW.osm_id > 0)
EXECUTE PROCEDURE polygon_insert_function();


CREATE TRIGGER point_delete_trigger
AFTER DELETE
ON openrailwaymap_point
FOR EACH ROW
WHEN (OLD.osm_id > 0)
EXECUTE PROCEDURE point_delete_function();

CREATE TRIGGER line_delete_trigger
AFTER DELETE
ON openrailwaymap_line
FOR EACH ROW
WHEN (OLD.osm_id > 0)
EXECUTE PROCEDURE line_delete_function();

CREATE TRIGGER polygon_delete_trigger
AFTER DELETE
ON openrailwaymap_polygon
FOR EACH ROW
WHEN (OLD.osm_id > 0)
EXECUTE PROCEDURE polygon_delete_function();


CREATE VIEW changelog.created_points_v AS
SELECT *
FROM changelog.created_point
WHERE (osm_id, changed) NOT IN (
	SELECT osm_id, changed
	FROM changelog.deleted_point
);

CREATE VIEW changelog.created_lines_v AS
SELECT *
FROM changelog.created_line
WHERE (osm_id, changed) NOT IN (
	SELECT osm_id, changed
	FROM changelog.deleted_line
);

CREATE VIEW changelog.created_polygons_v AS
SELECT *
FROM changelog.created_polygon
WHERE (osm_id, changed) NOT IN (
	SELECT osm_id, changed
	FROM changelog.deleted_polygon
);


CREATE VIEW changelog.modified_points_v AS
SELECT c.osm_id AS osm_id,
	c.tags AS new_tags,
	d.tags AS old_tags,
	c.geom AS new_geom,
	d.geom AS old_geom,
	c.changed AS changed
FROM changelog.created_point c
JOIN changelog.deleted_point d ON c.osm_id = d.osm_id AND c.changed = d.changed;

CREATE VIEW changelog.modified_lines_v AS
SELECT c.osm_id AS osm_id,
	c.tags AS new_tags,
	d.tags AS old_tags,
	c.geom AS new_geom,
	d.geom AS old_geom,
	c.changed AS changed
FROM changelog.created_line c
JOIN changelog.deleted_line d ON c.osm_id = d.osm_id AND c.changed = d.changed;

CREATE VIEW changelog.modified_polygons_v AS
SELECT c.osm_id AS osm_id,
	c.tags AS new_tags,
	d.tags AS old_tags,
	c.geom AS new_geom,
	d.geom AS old_geom,
	c.changed AS changed
FROM changelog.created_polygon c
JOIN changelog.deleted_polygon d ON c.osm_id = d.osm_id AND c.changed = d.changed;


CREATE VIEW changelog.deleted_points_v AS
SELECT *
FROM changelog.deleted_point
WHERE (osm_id, changed) NOT IN (
	SELECT osm_id, changed
	FROM changelog.created_point
);

CREATE VIEW changelog.deleted_lines_v AS
SELECT *
FROM changelog.deleted_line
WHERE (osm_id, changed) NOT IN (
	SELECT osm_id, changed
	FROM changelog.created_line
);

CREATE VIEW changelog.deleted_polygons_v AS
SELECT *
FROM changelog.deleted_polygon
WHERE (osm_id, changed) NOT IN (
	SELECT osm_id, changed
	FROM changelog.created_polygon
);
