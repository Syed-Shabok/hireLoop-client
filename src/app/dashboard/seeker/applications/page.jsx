import { getApplicationsByApplicant } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";
import React from "react";
import { Table, Chip, Button } from "@heroui/react";
import { Eye, FileText } from "@gravity-ui/icons";

const JobApplicationsPage = async () => {
  const user = await getUserSession();

  const jobsApplied =
    (await getApplicationsByApplicant(user?._id || "anonymous_applicant")) ||
    [];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 min-h-screen text-white">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          My Applications
        </h2>

        <p className="text-sm text-[#71717a]">
          Review all submitted application files and current review status.
        </p>
      </div>

      {/* Table Container */}
      <div className="border border-[#222226] bg-[#121214] rounded-xl overflow-hidden shadow-2xl">
        <Table aria-label="Applicant job applications">
          <Table.ResizableContainer>
            <Table.Content className="min-w-[900px]">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  id="jobTitle"
                  defaultWidth="2fr"
                  minWidth={200}
                >
                  Job Title
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column
                  id="applicant"
                  defaultWidth="1.2fr"
                  minWidth={150}
                >
                  Applicant
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column id="resume" defaultWidth="1.5fr" minWidth={220}>
                  Resume
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column id="status" defaultWidth="1fr" minWidth={120}>
                  Status
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column id="date" defaultWidth="1fr" minWidth={150}>
                  Applied On
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column id="actions" defaultWidth="1fr" minWidth={120}>
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body emptyContent="No applications have been submitted yet.">
                {jobsApplied.map((application) => (
                  <Table.Row key={application._id}>
                    {/* Job Title */}
                    <Table.Cell>
                      <div className="font-medium text-white">
                        {application.jobTitle}
                      </div>

                      <div className="text-xs text-[#52525b] mt-0.5">
                        ID: {application.jobId}
                      </div>
                    </Table.Cell>

                    {/* Applicant */}
                    <Table.Cell>
                      <div className="text-[#e4e4e7]">
                        {application.applicantName}
                      </div>
                    </Table.Cell>

                    {/* Resume */}
                    <Table.Cell>
                      <a
                        href={application.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-400 hover:text-violet-300 text-sm truncate block max-w-[220px]"
                      >
                        View Resume
                      </a>
                    </Table.Cell>

                    {/* Status */}
                    <Table.Cell>
                      <Chip
                        size="sm"
                        variant="flat"
                        color={
                          application.status === "accepted"
                            ? "success"
                            : application.status === "rejected"
                              ? "danger"
                              : application.status === "interview"
                                ? "warning"
                                : "default"
                        }
                        className="capitalize font-medium"
                      >
                        {application.status?.replaceAll("_", " ")}
                      </Chip>
                    </Table.Cell>

                    {/* Date */}
                    <Table.Cell className="text-[#a1a1aa] text-sm">
                      {application.createdAt
                        ? new Date(application.createdAt).toLocaleDateString()
                        : "N/A"}
                    </Table.Cell>

                    {/* Actions */}
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <a
                          href={application.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-md text-[#a1a1aa] hover:text-white transition-colors"
                          aria-label="View Resume"
                        >
                          <Eye width={16} height={16} />
                        </a>

                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-violet-400 hover:text-violet-300 min-w-8 h-8 rounded-md transition-colors"
                          aria-label="Application Details"
                        >
                          <FileText width={16} height={16} />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ResizableContainer>
        </Table>
      </div>
    </div>
  );
};

export default JobApplicationsPage;
