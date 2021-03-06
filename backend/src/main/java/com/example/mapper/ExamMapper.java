package com.example.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.entity.Exam;
import com.example.entity.ExamCategory;
import com.example.entity.QuestionLevel;
import com.example.vo.ExamVo;
import com.example.vo.QuestionSelectVo;
import org.apache.ibatis.annotations.Select;

import java.util.List;


public interface ExamMapper extends BaseMapper<Exam> {
    @Select("select e.id as serial,e.`name` as `name`,ec.`name` as `subject`,el.`name` as difficulty,e.score as score,e.time_limit as duration from exam e,exam_category ec,exam_level el where e.category_id = ec.id and e.level_id = el.id")
    List<ExamVo> findAllExamVos();

    @Select("select q.id,q.`name`,qt.`type` as `type` from question q,question_type qt where q.type_id = #{id} and qt.id = q.type_id")
    List<QuestionSelectVo> findQuestionsByTypeId(Integer id);

    @Select("select id as ExamCategoryId,name as ExamCategoryName from exam_category")
    List<ExamCategory> findAllExamCategories();

    @Select("select id as questionLevelId,name as questionLevelName from exam_level")
    List<QuestionLevel> findAllQuestionLevels();

    @Select("select name from exam_level where id = #{id}")
    String findLevelById(Integer id);
    @Select("select name from exam_category where id = #{id}")
    String findCategoryById(Integer id);

    @Select("select e.id as `serial`,e.`name` as `name`,ec.`name` as `subject`,el.`name` as difficulty,e.score as score,e.time_limit as duration,er.score as getScore from exam_record er,exam e,exam_category ec,exam_level el where er.joiner_id = #{id} and e.id = er.exam_id and e.category_id = ec.id and e.level_id = el.id")
    List<ExamVo> findMyExamVosById(Integer id);


    @Select("select e.id as serial,e.`name` as `name`,ec.`name` as `subject`,el.`name` as difficulty,e.score as score,e.time_limit as duration from exam e,exam_category ec,exam_level el where e.category_id = ec.id and e.level_id = el.id and e.`name` like CONCAT('%',#{key},'%')")
    List<ExamVo> findExamVosByKey(String key);
}










