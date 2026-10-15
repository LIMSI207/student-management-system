
const STORAGE_KEY = "students";
const BACKUP_KEY = "students_backup";

let storageIsValid = true;

export function createUniqueStudentId(students = []) {
  const existingIds = new Set(
    students.map((student) => String(student.id))
  );

  let id;

  do {
    id = `student-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 9)}`;
  } while (existingIds.has(id));

  return id;
}

export function loadStudentsFromStorage() {
  storageIsValid = true;

  try {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (storedData === null) {
      return [];
    }

    const parsedData = JSON.parse(storedData);

    if (
      !Array.isArray(parsedData) ||
      !parsedData.every(
        (student) =>
          student !== null &&
          typeof student === "object" &&
          !Array.isArray(student)
      )
    ) {
      storageIsValid = false;
      console.error("Student data is invalid. Saving is paused.");
      return [];
    }

    const usedIds = new Set();

    return parsedData.map((student) => {
      let id = student.id;

      if (!id || usedIds.has(String(id))) {
        id = createUniqueStudentId(
          Array.from(usedIds, (existingId) => ({
            id: existingId,
          }))
        );
      }

      usedIds.add(String(id));

      return {
        ...student,
        id,
        status: student.status || "Active",
      };
    });
  } catch (error) {
    storageIsValid = false;
    console.error("Unable to load student data:", error);
    return [];
  }
}

export function saveStudentsToStorage(students) {
  if (!storageIsValid) {
    console.error(
      "Save cancelled to protect existing student data."
    );
    return false;
  }

  try {
    const oldData = localStorage.getItem(STORAGE_KEY);

    if (oldData !== null) {
      localStorage.setItem(BACKUP_KEY, oldData);
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(students)
    );

    return true;
  } catch (error) {
    console.error("Unable to save student data:", error);
    return false;
  }
}
