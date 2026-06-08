import { getCompanyJobs } from "@/lib/api/jobs";
import React from "react";
import { Chip, Table, Button } from "@heroui/react";
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";

export default async function RecruiterJobs() {
  const companyId = "COMP-123";
  const jobs = (await getCompanyJobs(companyId)) || [];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 min-h-screen text-white">
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          Manage All Vacancies
        </h2>
        <p className="text-sm text-[#71717a]">
          Review status matrix, edit structures, or remove active listings.
        </p>
      </div>

      <div className="border border-[#222226] bg-[#121214] rounded-xl overflow-hidden shadow-2xl">
        <Table aria-label="Company job listings control panel">
          <Table.ResizableContainer>
            <Table.Content className="min-w-[700px]">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  defaultWidth="2fr"
                  id="title"
                  minWidth={180}
                >
                  Job Title
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1fr" id="location" minWidth={130}>
                  Location
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1.2fr" id="salary" minWidth={150}>
                  Compensation
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                  Status
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1fr" id="actions" minWidth={120}>
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body emptyContent="No structural records matches this workspace allocation.">
                {jobs.map((job) => {
                  const jobId = job._id;
                  const displaySalary =
                    job.minSalary && job.maxSalary
                      ? `${Number(job.minSalary).toLocaleString()} - ${Number(job.maxSalary).toLocaleString()}`
                      : "Not specified";

                  return (
                    <Table.Row key={jobId}>
                      <Table.Cell>
                        <div className="font-medium text-white">
                          {job.title}
                        </div>
                        <div className="text-xs text-[#52525b] mt-0.5">
                          Deadline: {job.deadline}
                        </div>
                      </Table.Cell>
                      <Table.Cell className="text-[#e4e4e7]">
                        {job.isRemote ? (
                          <Chip
                            size="sm"
                            variant="flat"
                            className="bg-[#1a1a1e] text-[#a1a1aa] border border-[#2e2e33]"
                          >
                            Remote
                          </Chip>
                        ) : (
                          <span className="text-sm">
                            {job.city || "On-site"}
                          </span>
                        )}
                      </Table.Cell>
                      <Table.Cell className="text-[#e4e4e7] font-mono text-xs">
                        {displaySalary}
                      </Table.Cell>
                      <Table.Cell>
                        <Chip
                          color={
                            job.status === "active" ? "success" : "default"
                          }
                          size="sm"
                          variant="soft"
                          className="capitalize font-medium"
                        >
                          {job.status || "inactive"}
                        </Chip>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-[#a1a1aa] hover:text-white min-w-8 h-8 rounded-md transition-colors"
                            aria-label="View details"
                          >
                            <Eye width={16} height={16} />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-[#a1a1aa] hover:text-white min-w-8 h-8 rounded-md transition-colors"
                            aria-label="Edit listing"
                          >
                            <Pencil width={16} height={16} />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-[#f31260] hover:bg-[#f31260]/10 min-w-8 h-8 rounded-md transition-colors"
                            aria-label="Delete listing"
                          >
                            <TrashBin width={16} height={16} />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ResizableContainer>
        </Table>
      </div>
    </div>
  );
}
